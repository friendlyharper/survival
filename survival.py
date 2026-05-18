import os
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask_mail import Mail, Message
import stripe

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///survival.db'
app.config['MAIL_SERVER'] = 'smtp.example.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your_email@example.com'
app.config['MAIL_PASSWORD'] = 'your_email_password'

db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
mail = Mail(app)

stripe.api_key = "your_stripe_secret_key"

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    is_premium = db.Column(db.Boolean, default=False)
    referral_code = db.Column(db.String(10), unique=True, nullable=False)
    referrals = db.relationship('Referral', backref='referrer', lazy=True)

class Referral(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    referred_user_email = db.Column(db.String(150), nullable=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password_hash, password):
            login_user(user)
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid email or password')
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        referral_code = request.form.get('referral_code')
        referrer = User.query.filter_by(referral_code=referral_code).first()

        if User.query.filter_by(email=email).first():
            flash('Email already registered')
            return redirect(url_for('register'))

        new_user = User(username=username, email=email, password_hash=generate_password_hash(password), referral_code=os.urandom(5).hex())
        db.session.add(new_user)
        db.session.commit()

        if referrer:
            new_referral = Referral(user_id=new_user.id, referred_user_email=email)
            db.session.add(new_referral)
            db.session.commit()

            referrer.referrals.append(new_referral)
            if len(referrer.referrals) >= 5:
                referrer.is_premium = True
            db.session.commit()

        flash('Registration successful. Please log in.')
        return redirect(url_for('login'))

    return render_template('register.html')

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html', user=current_user)

@app.route('/premium')
@login_required
def premium():
    if not current_user.is_premium:
        flash('You need a Premium subscription to access this content.')
        return redirect(url_for('dashboard'))

    return render_template('premium_content.html')

@app.route('/checkout', methods=['POST'])
@login_required
def checkout():
    try:
        customer = stripe.Customer.create(
            email=current_user.email,
            source=request.form['stripeToken']
        )

        charge = stripe.Charge.create(
            customer=customer.id,
            amount=999,  # $9.99 in cents
            currency='usd',
            description='Premium Subscription'
        )

        current_user.is_premium = True
        db.session.commit()
        flash('Payment successful!')
    except stripe.error.StripeError as e:
        flash(f'An error occurred: {e}')

    return redirect(url_for('dashboard'))

@app.route('/referral')
@login_required
def referral():
    msg = Message("Join our Survival Training App!", sender="your_email@example.com", recipients=[current_user.email])
    msg.body = f"Use this link to join: http://localhost:5000/register?referral_code={current_user.referral_code}"
    mail.send(msg)
    flash('Referral email sent!')
    return redirect(url_for('dashboard'))

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

if __name__ == '__main__':
    # This "with" block is the "Application Context" Flask is asking for
    with app.app_context():
        db.create_all()

    # Run the app on your open port
    app.run(debug=True, port=5001)

import type { Article, QuizQuestion } from '../types'

export const plainsArticles: Article[] = [
    {
        id: 'plains-tornado',
        categoryId: 'plains',
        title: 'Tornado Survival on the Colorado Plains',
        summary: 'Eastern Colorado is part of "Tornado Alley." Flat terrain means tornadoes are visible from miles away — but also means there is nowhere to hide outdoors.',
        difficulty: 'beginner',
        threatLevel: 'critical',
        timeToRead: 5,
        isPremium: false,
        steps: [
            { order: 1, action: 'Recognize warning signs before the funnel appears', detail: 'Loud roar like a freight train. Greenish-black sky. Large hail followed by sudden calm. Rotating wall cloud. Debris falling from sky. A tornado can be embedded in rain and invisible until it is on top of you.' },
            { order: 2, action: 'In a building: interior room, lowest floor, no windows', detail: 'Bathroom, closet, or hallway in the center of the structure. Get under something heavy (mattress, blankets, sturdy table). Mobile homes provide almost no protection — evacuate to a substantial building.' },
            { order: 3, action: 'In a vehicle: do NOT try to outrun it', detail: 'If you can clearly see the tornado and it is moving AWAY (traveling left or right), you may be able to drive perpendicular away from its path. If it appears stationary (growing larger), it is coming at you — abandon the vehicle.' },
            { order: 4, action: 'On foot outdoors: find a ditch or low depression, lie flat', detail: 'A ditch perpendicular to the tornado\'s path, lying face down with hands protecting your head, is better than standing. A highway overpass is NOT a shelter — it creates a wind tunnel effect and kills people.', warning: 'Never shelter under a highway overpass during a tornado. This is a widespread myth that causes deaths.' },
            { order: 5, action: 'After the tornado: watch for hazards', detail: 'Downed power lines (treat all as live). Structural damage. Gas leaks (smell, hissing). Do not enter damaged buildings until cleared by authorities.' },
        ],
        tips: [
            'A NOAA weather radio ($30) is the most reliable tornado warning system',
            'If tornado watches/warnings are issued, delay outdoor activities on the eastern plains',
            'Know your county\'s emergency alert system and sign up for local notifications at coalert.gov',
        ],
        warnings: [
            'Never shelter under a highway overpass during a tornado — it creates a lethal wind tunnel effect',
            'Mobile homes must be evacuated before severe weather — they provide almost no protection from tornadoes',
        ],
        faqItems: [
            {
                id: 'faq-plains-1',
                question: 'Is a highway overpass safe to shelter under during a tornado?',
                answer: 'No — this is one of the most dangerous tornado myths. Highway overpasses create a venturi effect that dramatically increases wind speed. People have been killed and severely injured sheltering under overpasses during tornadoes in Oklahoma and Kansas. Lie flat in a low ditch, face down, far from trees and vehicles.',
                categoryId: 'plains',
                tags: ['tornado', 'overpass', 'myths', 'shelter'],
            },
        ],
        relatedIds: ['urban-emergency'],
    },
    {
        id: 'plains-lightning',
        categoryId: 'plains',
        title: 'Lightning Safety on Colorado\'s Open Plains',
        summary: 'Colorado leads the US in lightning fatalities per capita. On flat terrain, you ARE the highest point. Know how to minimize your risk.',
        difficulty: 'beginner',
        threatLevel: 'high',
        timeToRead: 4,
        isPremium: false,
        steps: [
            { order: 1, action: 'Seek substantial shelter when lightning is within 10 miles', detail: 'If you can hear thunder, lightning is within 10 miles — seek shelter immediately. A fully enclosed metal vehicle (windows up) is effective. A substantial building is better.' },
            { order: 2, action: 'Lightning position if caught in open field', detail: 'Crouch on the balls of your feet, feet together, head down, ears covered. Minimize contact with the ground. Do NOT lie flat.' },
            { order: 3, action: 'Avoid isolated trees, fences, water', detail: 'Lightning strikes the highest object — in open plains, that might be you or the only tree for miles. Move away from fences and wire (ground current travels for hundreds of feet along metal).' },
        ],
        tips: [
            'The 30-30 rule: if time between lightning and thunder is under 30 seconds, seek shelter. Wait 30 minutes after last thunder before going back outside.',
            'Lightning can strike 10 miles from the storm cloud — clear sky near you is not safety if you can hear thunder anywhere',
        ],
        warnings: [
            'Standing near a single tall tree on open plains makes you a ground current target even if lightning strikes the tree',
            'Golf courses, sports fields, and farm fields on the eastern plains are extremely high-risk environments during summer thunderstorms',
        ],
        faqItems: [
            {
                id: 'faq-plains-2',
                question: 'Can lightning kill me inside my car?',
                answer: 'Very rarely. A fully enclosed metal-body vehicle acts as a partial Faraday cage — current travels around the outside. Roll up windows, stay off metal parts, and do not use electronics. Convertibles, motorcycles, and open vehicles provide NO protection.',
                categoryId: 'plains',
                tags: ['lightning', 'car', 'vehicle', 'safety'],
            },
        ],
        relatedIds: ['alpine-weather'],
    },
    {
        id: 'plains-stranded',
        categoryId: 'plains',
        title: 'Stranded on the Colorado Plains: Vehicle Survival',
        summary: 'Eastern Colorado roads can leave you stranded 40+ miles from help with no cell service, extreme heat in summer, or a blizzard closing roads for days. Staying with the vehicle is almost always right.',
        difficulty: 'beginner',
        threatLevel: 'high',
        timeToRead: 6,
        isPremium: false,
        steps: [
            { order: 1, action: 'Almost always: stay with the vehicle', detail: 'A vehicle is infinitely easier for rescuers to find than a person on foot. It provides shelter from wind, rain, sun, and cold. Rescuers search roads, not open plains. Leave ONLY if you can clearly see help within walking distance AND weather is safe AND you are certain of the route.' },
            { order: 2, action: 'Make your vehicle visible', detail: 'Raise the hood (universal distress signal). Tie bright material to the antenna. Place a flare behind the vehicle. Leave interior lights on at night. On flat plains, a visible vehicle can be spotted from 2–3 miles. A person walking cannot.' },
            { order: 3, action: 'Manage heat in summer', detail: 'A vehicle in direct sun becomes a furnace. Use your reflective windshield shade. If temperatures inside are dangerous, shelter under the vehicle on the shaded underside, or crack doors to create cross-ventilation. Drink water steadily.' },
            { order: 4, action: 'Winter: run engine strategically with exhaust check', detail: 'In blizzard conditions, run engine 10 minutes per hour to conserve fuel while staying warm. CRITICAL: Before every engine start, verify the exhaust pipe is not blocked by snow. A blocked exhaust fills the interior with CO in minutes.', warning: 'A blocked exhaust pipe during engine warm-up is a carbon monoxide death trap. Check it before every start.' },
            { order: 5, action: 'Signal every passing vehicle and aircraft', detail: 'Mirror signals are visible 10+ miles in clear plains conditions. Three horn blasts, three flashes = universal distress. Keep phone charged by running the engine 10 minutes when battery is low. Colorado State Patrol: dial *CSP (*277) — may connect even with low signal.' },
        ],
        tips: [
            'Always carry 4 liters of water in any vehicle crossing eastern Colorado highways in summer',
            'A space blanket in the glove box serves both as shade material and emergency warmth insulation',
            'Carry road flares, a reflective triangle, and jumper cables as minimum vehicle emergency kit',
        ],
        warnings: [
            'Walking on eastern Colorado roads in a blizzard with zero visibility puts you at extreme risk of being struck by a vehicle',
            'Carbon monoxide from a snow-blocked exhaust has killed multiple people during Colorado blizzards',
        ],
        faqItems: [
            {
                id: 'faq-plains-stranded-1',
                question: 'How long can I survive in a stranded vehicle during a Colorado blizzard?',
                answer: 'With proper management, days. A modern vehicle insulates well if you manage fuel strategically: 10 minutes of running per hour provides meaningful warmth. Insulate yourself with all available clothing and seat covers. Stay hydrated by melting snow. Signal every time you hear a vehicle. People have survived multi-day blizzards in vehicles.',
                categoryId: 'plains',
                tags: ['stranded', 'blizzard', 'vehicle', 'survival'],
            },
        ],
        relatedIds: ['plains-tornado', 'plains-lightning', 'urban-emergency'],
    },
    {
        id: 'plains-blizzard',
        categoryId: 'plains',
        title: 'Blizzard Survival on Colorado\'s Eastern Plains',
        summary: 'Eastern Colorado blizzards produce white-out conditions with 60+ mph winds and can drop 3+ feet of snow in 24 hours. These kill livestock, strand travelers, and collapse structures.',
        difficulty: 'beginner',
        threatLevel: 'high',
        timeToRead: 6,
        isPremium: false,
        steps: [
            { order: 1, action: 'Recognize Colorado blizzard warning tiers', detail: 'Blizzard Warning: sustained 35+ mph winds + considerable snow + visibility under 1/4 mile for 3+ hours. Winter Storm Warning: heavy snow forecast. Blizzard Watch: conditions possible in 12–48 hours. A Blizzard Warning means do not travel under any circumstances.' },
            { order: 2, action: 'Home shelter-in-place: stock up at the Watch stage', detail: 'Have minimum 3 days of food, water, and medications before any Winter Storm Warning. Fill the bathtub. Charge all devices. Identify the best-insulated interior room. Have candles, blankets, and a battery radio ready.' },
            { order: 3, action: 'If power fails: concentrate heat in one space', detail: 'Close off all rooms except one. Stuff towels against door bases. Hang blankets over windows. Multiple people in one room significantly slows heat loss. A well-insulated Colorado home loses 1–2°F per hour without heat in extreme cold.' },
            { order: 4, action: 'Avoid all CO hazards — strictly', detail: 'Never run a generator, camp stove, charcoal grill, or gas-powered anything inside or in a garage. These kill people in Colorado storms every year. A gas fireplace with proper venting is acceptable. CO detectors on every floor — replace batteries annually.' },
            { order: 5, action: 'Post-storm: monitor roof load', detail: 'Heavy wet Colorado snow can reach 20+ lbs per square foot. Flat or low-pitch roofs can collapse. If you hear creaking or cracking from above, exit immediately. Remove snow from attached garages and outbuildings with a roof rake.' },
        ],
        tips: [
            'A wood-burning fireplace or stove is the most reliable off-grid heat source for a Colorado home',
            'A car kit for every vehicle from November–March: blankets, boots, hand warmers, snacks, water, small shovel',
            'Never shovel after a blizzard if you have any cardiac risk factors — it causes heart attacks',
        ],
        warnings: [
            'Whiteout conditions on Colorado I-70 and US-24 produce fatal multi-vehicle pileups annually — a Blizzard Warning means do not drive',
            'Frostbite can occur in minutes at wind-chill temperatures below -20°F — cover all exposed skin before going outside',
        ],
        faqItems: [
            {
                id: 'faq-plains-blizzard-1',
                question: 'How long can a Colorado blizzard last?',
                answer: 'Major Colorado blizzards typically last 12–48 hours, but historic storms (the 2003 Holiday Storm, 2019 bomb cyclone) produced blizzard conditions for 2–3 days. Prepare for at least 72 hours of isolation. Drifting after the storm ends can block rural roads for additional days.',
                categoryId: 'plains',
                tags: ['blizzard', 'duration', 'preparation', 'Colorado'],
            },
        ],
        relatedIds: ['plains-tornado', 'plains-stranded', 'urban-emergency'],
    },
    {
        id: 'plains-grassfire',
        categoryId: 'plains',
        title: 'Grassfire Escape on Colorado\'s Open Plains',
        summary: 'Grassfires on eastern Colorado plains travel up to 14 mph in high wind. They produce virtually no warning and can overtake a vehicle. This premium guide covers the specific escape decisions.',
        difficulty: 'advanced',
        threatLevel: 'critical',
        timeToRead: 8,
        isPremium: true,
        steps: [
            { order: 1, action: 'Understand grassfire speed and behavior', detail: 'Grassfires travel 2–6 mph in calm conditions, 8–14 mph in Colorado\'s typical plains winds. Flying embers can start new fires 1/4 mile ahead of the main front. A fire you see at 2 miles can reach you in 15 minutes. Act on first sighting, not on first heat.' },
            { order: 2, action: 'Escape direction: across the wind, not with it', detail: 'Fire travels WITH the wind. Running the same direction as the wind means running the same direction as the fire — you cannot outrun it. Running perpendicular (90°) to the wind gets you out of the fire\'s path. Identify wind direction and run at a right angle to it.' },
            { order: 3, action: 'Seek fuel-free ground', detail: 'Fire cannot cross ground without fuel. A paved road, a plowed/harvested field, a pond or creek, a building with metal roof — all are defensible positions. Drive toward these if possible. Do not shelter in a wooden structure with surrounding vegetation.' },
            { order: 4, action: 'Vehicle entrapment: last resort survival position', detail: 'If your vehicle is overtaken: pull off the road, engine off, keep headlights on. Stay in the vehicle. Close all vents. Get on the floor below window level. Cover yourself with a wool blanket. The fire front typically passes in 30–90 seconds. A vehicle provides significantly better protection than being on foot.', warning: 'Do not open car doors if surrounded by active flame — the rush of oxygen can cause a flashover inside the vehicle.' },
            { order: 5, action: 'Backfire as last resort on foot', detail: 'If completely overrun on foot: light a small fire on the downwind side of your position, let it burn a small area, then move into the burned zone. The burned area has no fuel — the main fire will not burn there again. This requires calm execution under extreme stress and should only be attempted when all other options are exhausted.' },
        ],
        tips: [
            'Synthetic clothing melts onto skin in fire heat — wear natural fibers (wool, cotton) in fire-prone environments',
            'Colorado\'s grassfire risk peaks March–May (dormant dry grass + spring winds) and October–November',
            'A Red Flag Warning means any spark can become a catastrophic grassfire on the plains — treat it as you would a severe thunderstorm warning',
        ],
        warnings: [
            'Never assume you can outrun a grassfire on foot with 30+ mph winds — it is faster than you are',
            'Grassfire smoke reduces visibility to near zero rapidly — maintain visual on your escape route before smoke envelops you',
        ],
        faqItems: [
            {
                id: 'faq-plains-grassfire-1',
                question: 'Can I drive through a grassfire?',
                answer: 'Possibly if the fire is narrow, the road is clear ahead, and visibility allows. Accelerate through quickly with windows closed and vents off. If the fire is wide and you cannot see through it, or if the road ahead is blocked, do not attempt it. Stopping in the middle of active flame is far more dangerous than sheltering in a vehicle at the edge.',
                categoryId: 'plains',
                tags: ['grassfire', 'vehicle', 'escape', 'driving'],
            },
        ],
        relatedIds: ['plains-tornado', 'plains-stranded'],
    },
]

export const plainsQuiz: QuizQuestion[] = [
    {
        id: 'quiz-plains-1',
        categoryId: 'plains',
        question: 'You are driving on the eastern Colorado plains and a tornado is approaching. You cannot outrun it. The best option is:',
        options: [
            'Drive under the nearest highway overpass for shelter',
            'Stay in your car with seatbelt on',
            'Abandon the car, get into a ditch perpendicular to the tornado path, lie flat face down',
            'Drive at 90 degrees to the tornado\'s path at high speed',
        ],
        correctIndex: 2,
        explanation: 'A car is a steel projectile in a tornado — it will be tumbled and crushed. A highway overpass creates a deadly wind tunnel. If you cannot drive safely away from the tornado\'s path, abandon the vehicle and find the lowest ground available. Lie face down in a ditch, hands protecting your head. This is far safer than either the car or an overpass.',
        difficulty: 'beginner',
    },
]

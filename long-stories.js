window.JOYFUL_EXTRA_STORIES = window.JOYFUL_EXTRA_STORIES || [];

const longStorySeeds = [
    ["maple-moon", "The Maple Moon Map", "Aarav", "a moon map", "the old maple grove", "protect the grove"],
    ["whispering-wheel", "The Whispering Water Wheel", "Meera", "a wooden water wheel", "the village stream", "bring water back to the gardens"],
    ["lantern-boat", "The Lantern Boat", "Zoya", "a lantern boat", "the misty lake", "guide a lost fisherman home"],
    ["golden-feather", "The Golden Feather", "Ishan", "a golden feather", "the hilltop forest", "help an injured bird fly again"],
    ["clocktower-cat", "The Clocktower Cat", "Nila", "a silver cat", "the town clocktower", "make the clock chime for the festival"],
    ["rainy-day-orchestra", "The Rainy Day Orchestra", "Kabir", "a box of instruments", "the school hall", "turn a rainy day into a concert"],
    ["secret-seed", "The Secret Seed", "Laya", "a glowing seed", "the community garden", "grow food for every neighbour"],
    ["cloud-postman", "The Cloud Postman", "Ravi", "a cloud-shaped letter", "the windy valley", "deliver a message of thanks"],
    ["paper-bridge", "The Paper Bridge", "Tara", "a folded paper bridge", "the riverside path", "help two friends cross safely"],
    ["midnight-museum", "The Midnight Museum", "Omar", "a talking compass", "the quiet museum", "return a missing exhibit"],
    ["star-garden", "The Star Garden", "Anvi", "a jar of starlight", "the school rooftop", "make a garden for night insects"],
    ["brave-little-bell", "The Brave Little Bell", "Dev", "a tiny brass bell", "the mountain trail", "warn hikers about a storm"],
    ["sea-glass-song", "The Sea Glass Song", "Pia", "a blue sea-glass bead", "the sunny shore", "clean the beach before the tide"],
    ["banyan-book", "The Banyan Book", "Sana", "a book with leaf pages", "the banyan tree", "save forgotten family stories"],
    ["painted-parachute", "The Painted Parachute", "Kiran", "a painted parachute", "the kite field", "rescue a basket of baby plants"],
    ["snowy-tea-shop", "The Snowy Tea Shop", "Maya", "a warm tea kettle", "the snowy market", "help neighbours stay warm"],
    ["river-clock", "The River Clock", "Arjun", "a pebble clock", "the blue river", "teach children to respect the tide"],
    ["butterfly-key", "The Butterfly Key", "Leela", "a butterfly-shaped key", "the glass greenhouse", "open a room of rare plants"],
    ["festival-tree", "The Festival Tree", "Noor", "a ribbon-covered tree", "the town square", "bring everyone together after an argument"],
    ["little-train-library", "The Little Train Library", "Vihaan", "a miniature train", "the station platform", "carry books to children in distant homes"]
];

function makeLongStory([id, title, child, magicalThing, place, purpose], index) {
    const story = `${child} discovered ${magicalThing} near ${place} on a morning when everything seemed ordinary. A small note explained that it could only work when its owner listened carefully, asked for help, and used it for someone else. At first, ${child} wanted to keep the discovery secret. But soon a real problem appeared: the community needed help to ${purpose}. ${child} watched, made a plan, and invited friends, elders, and neighbours to share what they knew.\n\nThe work was not easy. There were wrong turns, tired feet, and one moment when ${child} wanted to give up. Then the magical thing gave a gentle sign, reminding everyone that patience is also a kind of courage. Each person contributed one useful skill. Someone carried supplies, someone solved a puzzle, and someone made everyone laugh when the task felt too big.\n\nBy evening, they had succeeded. The people in ${place} celebrated, not because of magic alone, but because they had chosen to care for one another. ${child} placed ${magicalThing} where others could see it and wrote its lesson beneath it: small helpful actions become wonderful when a community joins in.`;
    const telugu = `${child} ఒక సాధారణ ఉదయం ${place} దగ్గర ${magicalThing}ను కనుగొన్నాడు. దానితో ఉన్న చీటీలో జాగ్రత్తగా వినడం, సహాయం అడగడం, ఇతరుల కోసం ఉపయోగించినప్పుడే అది పనిచేస్తుందని ఉంది. త్వరలో అక్కడి వారికి ${purpose} కోసం సహాయం కావాల్సి వచ్చింది. ${child} స్నేహితులు, పెద్దలు, పొరుగువారిని పిలిచి ఒక ప్రణాళిక వేశాడు.\n\nపని సులభం కాదు. తప్పు దారులు, అలసట, వదిలేయాలనిపించిన క్షణాలు వచ్చాయి. కానీ ఓపిక కూడా ధైర్యమని ఆ మాయా వస్తువు గుర్తుచేసింది. ప్రతి ఒక్కరు తమకు వచ్చిన సహాయం చేశారు. ఎవరో సామగ్రి మోశారు, ఎవరో సమస్య పరిష్కరించారు, ఎవరో అందరినీ నవ్వించారు.\n\nసాయంత్రానికి పని పూర్తయింది. ${place}లోని ప్రజలు కేవలం మాయ వల్ల కాదు, ఒకరికొకరు శ్రద్ధ చూపినందుకు ఆనందించారు. చిన్న సహాయాలు కలిసి చేస్తే అద్భుతాలవుతాయని ${child} నేర్చుకున్నాడు.`;
    return { id, title, desc: `A longer adventure where ${child} learns courage, kindness, and teamwork.`, age: index % 3 === 0 ? "7-9 Years" : "5-8 Years", image: `https://images.unsplash.com/photo-${index % 2 ? "1500534314209-a25ddb2bd429" : "1448375240586-882707db888b"}?w=1200&auto=format&fit=crop&q=80`, story, telugu };
}

window.JOYFUL_EXTRA_STORIES.push(...longStorySeeds.map(makeLongStory));

const littleTrainLibrary = window.JOYFUL_EXTRA_STORIES.find(story => story.id === "little-train-library");

if (littleTrainLibrary) {
    littleTrainLibrary.image = "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&auto=format&fit=crop&q=80";
}

const goldenFeather = window.JOYFUL_EXTRA_STORIES.find(story => story.id === "golden-feather");

if (goldenFeather) {
    goldenFeather.image = "https://images.unsplash.com/photo-1592657842843-4e49bee1859a?w=1200&auto=format&fit=crop&q=80";
}

const midnightMuseum = window.JOYFUL_EXTRA_STORIES.find(story => story.id === "midnight-museum");

if (midnightMuseum) {
    midnightMuseum.image = "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=1200&auto=format&fit=crop&q=80";
}

const butterflyKey = window.JOYFUL_EXTRA_STORIES.find(story => story.id === "butterfly-key");

if (butterflyKey) {
    butterflyKey.image = "https://images.unsplash.com/photo-1598446161906-341a4fa00216?w=1200&auto=format&fit=crop&q=80";
}

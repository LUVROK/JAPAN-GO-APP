import { Audio } from "expo-av";

const switchSound = async (symbol) => {
    switch (symbol) {
        case 'a': playSound(aSound); break;
        case 'i': playSound(iSound); break;
        case 'u': playSound(uSound); break;
        case 'e': playSound(eSound); break;
        case 'o': playSound(oSound); break;
        case 'ka': playSound(kaSound); break;
        case 'ki': playSound(kiSound); break;
        case 'ku': playSound(kuSound); break;
        case 'ke': playSound(keSound); break;
        case 'ko': playSound(koSound); break;
        case 'sa': playSound(saSound); break;
        case 'shi': playSound(shiSound); break;
        case 'su': playSound(suSound); break;
        case 'se': playSound(seSound); break;
        case 'so': playSound(soSound); break;
        case 'ta': playSound(taSound); break;
        case 'chi': playSound(tiSound); break;
        case 'tsu': playSound(tsuSound); break;
        case 'te': playSound(teSound); break;
        case 'to': playSound(toSound); break;
        case 'na': playSound(naSound); break;
        case 'ni': playSound(niSound); break;
        case 'nu': playSound(nuSound); break;
        case 'ne': playSound(neSound); break;
        case 'no': playSound(noSound); break;
        case 'ha': playSound(haSound); break;
        case 'hi': playSound(hiSound); break;
        case 'fu': playSound(fuSound); break;
        case 'he': playSound(heSound); break;
        case 'ho': playSound(hoSound); break;
        case 'ma': playSound(maSound); break;
        case 'mi': playSound(miSound); break;
        case 'mu': playSound(muSound); break;
        case 'me': playSound(meSound); break;
        case 'mo': playSound(moSound); break;
        case 'ya': playSound(yaSound); break;
        case 'yu': playSound(yuSound); break;
        case 'yo': playSound(yoSound); break;
        case 'ra': playSound(raSound); break;
        case 'ri': playSound(riSound); break;
        case 'ru': playSound(ruSound); break;
        case 're': playSound(reSound); break;
        case 'ro': playSound(roSound); break;
        case 'wa': playSound(waSound); break;
        case 'n': playSound(nSound); break;
        case 'wo': playSound(woSound); break;
    }
}

const aSound = require('../resources/a.mp3')
const iSound = require('../resources/i.mp3')
const uSound = require('../resources/u.mp3')
const eSound = require('../resources/e.mp3')
const oSound = require('../resources/o.mp3')
const kaSound = require('../resources/ka.mp3')
const kiSound = require('../resources/ki.mp3')
const kuSound = require('../resources/ku.mp3')
const keSound = require('../resources/ke.mp3')
const koSound = require('../resources/ko.mp3')
const saSound = require('../resources/sa.mp3')
const shiSound = require('../resources/shi.mp3')
const suSound = require('../resources/su.mp3')
const seSound = require('../resources/se.mp3')
const soSound = require('../resources/so.mp3')
const taSound = require('../resources/ta.mp3')
const tiSound = require('../resources/chi.mp3')
const tsuSound = require('../resources/tsu.mp3')
const teSound = require('../resources/te.mp3')
const toSound = require('../resources/to.mp3')
const naSound = require('../resources/na.mp3')
const niSound = require('../resources/ni.mp3')
const nuSound = require('../resources/nu.mp3')
const neSound = require('../resources/ne.mp3')
const noSound = require('../resources/no.mp3')
const haSound = require('../resources/ha.mp3')
const hiSound = require('../resources/hi.mp3')
const fuSound = require('../resources/fu.mp3')
const heSound = require('../resources/he.mp3')
const hoSound = require('../resources/ho.mp3')
const maSound = require('../resources/ma.mp3')
const miSound = require('../resources/mi.mp3')
const muSound = require('../resources/mu.mp3')
const meSound = require('../resources/me.mp3')
const moSound = require('../resources/mo.mp3')
const yaSound = require('../resources/ya.mp3')
const yuSound = require('../resources/yu.mp3')
const yoSound = require('../resources/yo.mp3')
const raSound = require('../resources/ra.mp3')
const riSound = require('../resources/ri.mp3')
const ruSound = require('../resources/ru.mp3')
const reSound = require('../resources/re.mp3')
const roSound = require('../resources/ro.mp3')
const waSound = require('../resources/wa.mp3')
const nSound = require('../resources/n.mp3')
const woSound = require('../resources/wo.mp3')

const playSound = async (Sound) => {
    try {
        const { sound: soundObject, status } = await Audio.Sound.createAsync(
            Sound,
            { shouldPlay: true }
        );
        // Your sound is playing!
    } catch (error) {
        // An error occurred!
    }
};

const playSoundkanji = async (Sound) => {
    // const playbackObject = new Audio.Sound();
    try {
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true })
        // const playbackObject = new Audio.Sound();
        const { sound: playbackObject } = await Audio.Sound.createAsync(
            { uri: Sound },
            { shouldPlay: true }
        );
        // Your sound is playing!
    } catch (error) {
        // An error occurred!
    }
};

export { playSound, switchSound, playSoundkanji }
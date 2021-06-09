module.exports = {
    
main: {
    F_WORD: /^f(\s|.{1,2})?u?(\s|.{1,2})?c(\s|.{1,2})?k$/gi
}, 
https: {
    IMAGE_MATCHING: /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gmi,
    SOURCEB_IN: /^https?:\/\/(sourceb|srcb)\.in\/(?<key>([A-Za-z0-9]){10})$/gi,
    YOUTUBE: /^(https:\/\/)?(www)?\.(youtube\.com|youtu\.be)\/watch\?v=(([A-Za-z0-9]){11})&?(\w+=\w+)?$/gm,
    DISCORD_MESSAGE: /^https:\/\/discord\.com\/channels\/(([0-9]){18})\/((\d){18})\/(([0-9]){18})$/gm
}
}
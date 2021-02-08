export const RenderHashtags = (text) => {
    
    const hashtags = text.toLowerCase().replace(/[^\w\s]/gi, ' ').replace(/ +/g, ' ').split(' ').filter(word => word !== "")
    const getUniques = (array) => {
        let words = [];
        for (var i = 0; i < array.length ; i++) {
            if(!words.includes(array[i])) {
                words.push(array[i]);
            }
        }
        return words;
    }

    if (hashtags.length > 1) {
        return getUniques(hashtags);
    } else {
        return hashtags;
    }
}

const key = 'sw'

export default {
    clear(){
        window.localStorage.clear()
    },
    add(word){
        let sw = window.localStorage.getItem(key)||''
        if (sw) {
            let words = sw.split(',')
            for(let i=0;i<words.length;i++){
                if(words[i] == word){
                    return
                }
            }
            sw +=','
        }
        sw += word
        window.localStorage.setItem(key,sw)
    },
    load(){
        let sw = window.localStorage.getItem(key)
        return sw ? sw.split(',') : []
    }
}
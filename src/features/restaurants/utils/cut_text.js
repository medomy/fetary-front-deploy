export default function cutText(txt){
    if(txt.length > 15){
        return txt.substring(0 , 15) + '...';
    }
    return txt;
}
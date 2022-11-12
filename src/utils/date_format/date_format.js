class Time{
    static getexactTime(date){
        return `${date.getHours()} : ${date.getMinutes()}`;
    }
    static getExactdate(date){
        return date.toLocaleDateString();
    }
    static getPreviousDay(date = new Date() , i) {
        const previous = new Date(date.getTime());
        previous.setDate(date.getDate() - i);
      
        return previous;
      }
}

export default Time;
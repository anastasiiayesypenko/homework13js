export default class Model {
    constructor() {
        this.urlList = this.getUrlFromLocalStorage();
    }
    unshiftItem(value) {
        let item = {
            url: value,
        };
        let urlValidation = /http(s)?:\/\/(www\.)?[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
        if (urlValidation.test(value) && !this.urlList.find(elem => elem.url === value)) {
            this.urlList.unshift(item);
            this.setUrlToLocalStorage(this.urlList);
        } else if (this.urlList.find(elem => elem.url === value)) {
            alert("Такая закладка уже существует!");
        } else if (!urlValidation.test(value)) {
            alert("Не прошло валидацию!")
        }
        return new Promise(resolve => resolve(this.urlList));
    };
    removeItem(cardUrl) {
        let indexOfDeletedUrl = this.urlList.indexOf(this.urlList.find(el => el.url === cardUrl));
        this.urlList.splice([indexOfDeletedUrl], 1);
        this.setUrlToLocalStorage(this.urlList);
    };
    setUrlToLocalStorage(array) {
        localStorage.setItem('favourites-links', JSON.stringify(array));
    };
    getUrlFromLocalStorage() {
        let data = localStorage.getItem('favourites-links');
        return data ? JSON.parse(data) : [];
    };
}
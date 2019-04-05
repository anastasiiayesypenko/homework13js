import Model from '../js/model.js';


describe('Model testing', function() {
    it('adding on resolve', function() {
        let model = new Model();
        return expect(model.unshiftItem('https://jestjs.io/docs/en/expect'))
        .resolves.toEqual(model.urlList);
    });
    it('adding unvalid', function() {
        window.alert = () => {}; 
        let model = new Model();
        return expect(model.unshiftItem('pamagite')).toEqual(expect.anything());
    });
    it('adding twice', function() {
        let model = new Model();
        let theSameUrl = 'https://app.schoology.com/page/1900056470';
        model.unshiftItem(theSameUrl);
        expect(model.unshiftItem(theSameUrl)).toEqual(expect.anything());
        model.removeItem(theSameUrl);
    })
    it('on remove', function() {
        let model = new Model();
        model.unshiftItem('https://stackoverflow.com/questions/55088482/jest-not-implemented-window-alert');
        model.removeItem('https://stackoverflow.com/questions/55088482/jest-not-implemented-window-alert');
        model.removeItem('https://jestjs.io/docs/en/expect'); //url saved in previous test "adding on resolve"
        expect(model.urlList).toEqual([]);
    })
    it('set to localStorage', function() {
        let model = new Model();
        let array = {url: 'http://blablabla.com'};
        model.setUrlToLocalStorage(array);
        expect(model.getUrlFromLocalStorage()).toEqual(array);
    });

});


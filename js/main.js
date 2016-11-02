var catalogBox;
var basketBox;
var basket = store.get('basket');
if (basket == undefined) {
    basket = new Object();
}
var catalogData = new Object();
jQuery(document).ready(function () {
    jQuery.getJSON("/catalog.json", function (data) {
        jQuery.each(data, function (item) {
            catalogData[data[item].id] = data[item];
            catalogData[data[item].id].count = 1;
        });

        //Модель каталога
        catalogBox = new Vue({
            el: '#catalogBox',
            data: {
                catalog: catalogData,
                show: true,
                dialog: {title: "",image: ""}
            },
            methods: {
                addCard: function (item) {
                    basket[item.id] = item.count;
                    store.set('basket', basket);
                    basketBox.items[item.id] = item;
                    menuTop.count = Object.keys(basket).length;
                },
                showInfo: function (item) {
                    this.dialog.title = item.title;
                    this.dialog.image = item.url;
                    $('#catalogInfo').modal('show');
                }
            }
        });

        //Сфомируем данные для коризны
        basketData = new Object();
        jQuery.each(basket, function (item, key) {
            basketData[item] = catalogData[item];
        });
       
        //модель корзины
        basketBox = new Vue({
            el: '#basketBox',
            data: {
                items: basketData,
                show: false,
            },
            methods: {
                sendCard: function () {
                    $('#basketInfo').modal('show');
                    basket = new Object();
                    store.set('basket', basket);
                    this.items = basket;
                    menuTop.count = Object.keys(basket).length;
                }
            }
        });
    });
    //Моделька главного меню
    var menuTop = new Vue({
        el: '#menuTop',
        data: {
            count: Object.keys(basket).length
        },
        methods: {
            showCatalog: function () {
                catalogBox.show = true;
                basketBox.show = false;
            },
            showBasket: function () {
                catalogBox.show = false;
                basketBox.show = true;
            },
        }
    });
});
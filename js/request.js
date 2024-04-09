$(document).ready(function () {
    $('.request__pay-methods-add-item_close').on('click', function (e){
        $(this).parent().remove()
    });
    let payMethodList = [];
    $('.request__pay-methods-add_btn').on('click', function (e){
        e.preventDefault();
        let payMethodItemNameWrapper = $('.request__pay-methods-add .select__current'),
            payMethodItemName = payMethodItemNameWrapper.text(),
            payMethodItemNumber = $('.request__pay-methods-add input'),
            payMethodItemNumberLast = payMethodItemNumber.val().substr(-4);
        if (payMethodItemName === "Другое") {
            return false
        }
        if (payMethodItemNumberLast.length < 1) {
            payMethodItemNumber.addClass('error')
            return false
        } else {
            payMethodItemNumber.removeClass('error')
        }
        if ($.inArray(payMethodItemNameWrapper.attr('data-bank'), payMethodList) !== -1) {
            return
        }
        payMethodList.push(payMethodItemNameWrapper.attr('data-bank'))
        let payMethodItemsList = $('.request__pay-methods-add-list'),
            payMethodItemNameWrapperAttr = payMethodItemNameWrapper.attr('data-bank'),
            newMethodItem = $(`<div class="request__pay-methods-add-item"><p>${payMethodItemName}<span>*${payMethodItemNumberLast}</span></p><img src="./img/payMethAdd.svg" data-bank=${payMethodItemNameWrapperAttr} class="request__pay-methods-add-item_close"></div>`, {
                'class': '.request__pay-methods-add-item'
            })
        payMethodItemsList.append(newMethodItem);
        $('.request__pay-methods-add-item_close').on('click', function (e){
            let removePayMethodAttr = $(this).attr('data-bank')
            payMethodList = jQuery.grep(payMethodList, function(value) {
                return value != removePayMethodAttr;
            });
            $(this).parent().remove()
        });
    });
    // маска
    $(".request__pay-methods-add input").mask("9999 9999 9999 9999", {placeholder: "_" });
});
function addFavorite() {
    id = $("#city_id").val()
    name = $("#city_name").val()
    $.ajax({
        type: "POST",
        url: "/add_fav",
        data: {
            'name':name,
            'id':id
        },
        success: function(response) {
            $('#favButton').replaceWith('Favorite added!')
        },
        dataType: "json"
    })
}

function deleteFavorite(id) {
    $.ajax({
        type: "POST",
        url: "/del_fav",
        data: {
            'id':id
        },
        success: function(response) {
            $('#'+id).remove()
        },
        dataType: "json"
    })
}

function setup_ajax() {
    var csrftoken = getCookie('csrftoken');
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function deleteFav(id) {
    console.log(id)
}
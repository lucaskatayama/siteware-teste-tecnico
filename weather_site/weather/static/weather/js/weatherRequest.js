/*
* Makes API call to Django to add current weather to database
*/
function addFavorite() {
    id = $("#city_id").val()
    name = $("#city_name").val()
    $.ajax({
        type: "POST",
        url: "/add_fav",
        data: {
            "name":name,
            "id":id
        },
        success: function(response) {
            toogleFavbutton(id)
        },
        dataType: "json"
    })
}

/*
* Makes API call to Django to remove current weather from database
*/
function deleteFavorite(id) {
    $.ajax({
        type: "POST",
        url: "/del_fav",
        data: {
            "id":id
        },
        success: function(response) {
            toogleFavbutton()
            $("#"+id).remove()
        },
        dataType: "json"
    })
}

/*
* Toogle Favorite button appeareance
*/
function toogleFavbutton(api_id) {
    var btn = $(".fav-btn")

    if(btn == undefined)
        return

    if (btn.attr("id") == "favButton") {
        btn.attr("onClick", "deleteFavorite("+api_id+")")
        btn.html("Remove Favorite")
        btn.attr("id", "unfavButton")
        btn.attr("class", "fav-btn btn btn-danger")
    } else {
        btn.attr("onClick", "addFavorite()")
        btn.html("Add Favorite")
        btn.attr("id", "favButton")
        btn.attr("class", "fav-btn btn btn-success")
    }
}

/*
* Setups Ajax to work with CSRF token
* More details on: https://docs.djangoproject.com/pt-br/2.1/ref/csrf/
*/
function setup_ajax() {
    var csrftoken = getCookie("csrftoken");
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
}

/*
* Returns methods that do not require the CSRK token
* More details on: https://docs.djangoproject.com/pt-br/2.1/ref/csrf/
*/
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

/*
* Gets a cookie from browser
* More details on: https://docs.djangoproject.com/pt-br/2.1/ref/csrf/
*/
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

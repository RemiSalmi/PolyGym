{
    const searchBtn = document.getElementById('searchBtn')

    searchBtn.addEventListener("click", searchEx)


    //Allow us to get an str without accent and put it also to lower case 
    function slugify(str) {
        str = str.replace(/^\s+|\s+$/g, '');

        // Make the string lowercase
        str = str.toLowerCase();

        // Remove accents, swap ñ for n, etc
        var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
        var to = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
        for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        // Remove invalid chars
        str = str.replace(/[^a-z0-9 -]/g, '')
            // Collapse whitespace and replace by -
            .replace(/\s+/g, '-')
            // Collapse dashes
            .replace(/-+/g, '-');

        return str;
    }
    
    function searchEx(event) {
        let searchBar = document.getElementById('searchBar').value
        let exs = document.getElementsByClassName('exs')
        for (let i = 0; i < exs.length; i++) {
            let exTitle = exs[i].children[0].children[0].children[1].children[0].innerHTML
            
            exTitle = slugify(exTitle)
            searchBar = slugify(searchBar)

            if (exTitle.includes(searchBar)) {
                exs[i].classList.remove('d-none')
            } else {
                exs[i].classList.add('d-none')
            }
        }
    }
}
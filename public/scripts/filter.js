{

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
            // Collapse whitespace and replace by _
            .replace(/\s+/g, '_')
            // Collapse dashes
            .replace(/-+/g, '-');

        return str;
    }


    let filters = document.getElementsByClassName('filter')
    for (let c = 0; c < filters.length; c++) {
        filters[c].checked = false
    }

    for (let a = 0; a < filters.length; a++) {
        filters[a].addEventListener('click', filter)
    }


    function resetFilter(event) {
        let filters = document.getElementsByClassName('filter')
        for (let i = 0; i < filters.length; i++) {
            filters[i].checked = true
        }
        filter()
        for (let i = 0; i < filters.length; i++) {
            filters[i].checked = false
        }
    }

    function filter(event) {

        let exs = document.getElementsByClassName('exs')
        let muscles = []
        let filtersEnable = []
        for (let j = 0; j < exs.length; j++) {
            muscles.push(slugify(exs[j].children[0].children[1].children[0].children[0].innerHTML).split('_'))
        }

        console.log(muscles)

        let filters = document.getElementsByClassName('filter')
        for (let i = 0; i < filters.length; i++) {
            if (filters[i].checked == true) {
                filtersEnable.push(slugify(filters[i].id))
            }
        }
        console.log(filtersEnable)
        let found
        for (let k = 0; k < muscles.length; k++) {
            found = false
            for (let l = 0; l < muscles[k].length; l++) {
                if (filtersEnable.includes(muscles[k][l])) {
                    found = true
                }
            }
            if (found == false) {
                exs[k].classList.add('filterActive')
            } else {
                exs[k].classList.remove('filterActive')
            }
        }

        if(filtersEnable.length == 0){
            for(let m = 0; m < exs.length; m ++){
                exs[m].classList.remove('filterActive')
            }
        }
    }
}
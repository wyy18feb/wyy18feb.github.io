$(function(){
    try {
        let sjs = SimpleJekyllSearch({
            searchInput: document.getElementById('search-input'),
            resultsContainer: document.getElementById('results-container'),
            json: '/search.json',
            searchResultTemplate: '<li class="list-group-item"><a href="{url}">{title}</a></li>',
            noResultsText: '<li class="list-group-item disabled">not found</li>',
            limit: 10
        });
    }
    catch(err) {
        console.log(err);
    }

    try {
        let gitalk  = new Gitalk ({
            id: md5(window.location.pathname),   // Ensure uniqueness and length less than 50
            clientID: '76b1df01c2e267fd8eb0',
            clientSecret: '700e51cd3832df7432f54ea7a0b46b28af9d451a',
            repo: 'wyy18feb.github.io',
            owner: 'wyy18feb',
            admin: ['wyy18feb'],
            distractionFreeMode: false  // Facebook-like distraction free mode
        });
        gitalk.render('gitalk-container');
    }
    catch(err) {
        console.log(err);
    }

});



function mapping(html, pairs) {
    for (const [key, value] of Object.entries(pairs)) {
        var reg = new RegExp("{{" + key + "}}", "ig");
        html = html.replace(reg, value);
    }
    return html;
}

var initialTitle = document.querySelector("head > title").textContent;
var itemsPromise = fetch("json/map.json?t=10").then(res => res.json());

itemsPromise.then(data => {
    var params = new URLSearchParams(location.search);
    var id = params.get("id");

    const groups = data.groups;
    const items = data.items;

    let target;
    if ( id && (target = items.find(t => t.id === id)) ) {
        const title = target.title;
        const gs = target.group.split('-');
        const groupMajorId = gs[0];
        
        // set title
        document.querySelector("head > title").textContent = title + "｜" + initialTitle;

        groups.find(g => {
            if ( g.id === groupMajorId ) {
                target.group_major = g.title;
                target.group_major_id = g.id;
                if ( gs.length > 1 ) {
                    const minor = g.children.find(gc => gc.id === gs[1]);
                    target.group_minor = minor.title;
                }
                return true;
            }
        });

        const relatedItems = items.filter(t => {
            return target.id !== t.id && t.group.indexOf(groupMajorId) === 0;
        });

        const detailTemp = $("template[detail]").html().trim();
        const itemTemp = $("template[item]").html().trim();

        const detailDom = $(mapping(detailTemp, target));

        if ( !target.twitter ) {
            detailDom.find("span[twitter-link]").remove();
        }

        if ( gs.length == 1 ) {
            detailDom.find("span[group-minor]").remove();
        }

        detailDom.find("a[data-target-group]").click((e) => {
            sessionStorage.setItem('_active_group', $(e.target).data("target-group"));
        });
        
        $(document.body).append(detailDom);
        
        const itemsWrap = $("main div[related-items]");

        relatedItems.forEach(item => {
            itemsWrap.append( mapping(itemTemp, item) );
        });

        itemsWrap.find('[data-toggle="tooltip"]').tooltip({
            trigger: "hover"
        });
    }
});

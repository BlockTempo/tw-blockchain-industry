
function mapping(html, pairs) {
    for (const [key, value] of Object.entries(pairs)) {
        var reg = new RegExp("{{" + key + "}}", "ig");
        html = html.replace(reg, value);
    }
    return html;
}

var itemsPromise = fetch("json/map.json").then(res => res.json());

itemsPromise.then(data => {
    var params = new URLSearchParams(location.search);
    var id = params.get("id");

    const groups = data.groups;
    const items = data.items;

    let target;
    if ( id && (target = items.find(t => t.id === id)) ) {
        if ( !target.twitter ) {
            $("div[detail-template] span[twitter-link]").remove();
        }

        const gs = target.group.split('-');
        
        if ( gs.length == 1 ) {
            $("div[detail-template] span[group-minor]").remove();
        }

        const groupMajorId = gs[0];
        
        groups.find(g => {
            if ( g.id === groupMajorId ) {
                target.group_major = g.title;
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

        const detailTemp = $("div[detail-template]").html().trim();
        const itemTemp = $("div[item-template]").html().trim();

        $(document.body).append(mapping(detailTemp, target))
        
        const itemsWrap = $("main div[related-items]");

        relatedItems.forEach(item => {
            itemsWrap.append( mapping(itemTemp, item) );
        });

        itemsWrap.find('[data-toggle="tooltip"]').tooltip({
            trigger: "hover"
        });
    }

    $("div[detail-template]").remove();
    $("div[item-template]").remove();
});

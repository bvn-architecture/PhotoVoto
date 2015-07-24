$(document).ready(function() {


    function shuffle(o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    var arrows=
       "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 178.6 178.6'>"
      +"  <symbol id='a' viewBox='-88 -88 176 176'>"
      +"    <circle r='88' cx='0' cy='0' fill='white' stroke='none'/>"
      +"    <path fill='none' stroke='#010101' stroke-miterlimit='10' d='M-.5-75' stroke-linecap='round' stroke-linejoin='round'/>"
      +"    <polyline fill='none' stroke='#010101' stroke-miterlimit='10' points='-28.1 46.9 0 75 28.1 46.9' stroke-linecap='round' stroke-linejoin='round'/>"
      +"    <line x1='0' x2='0' y1='75' y2='-75' fill='none' stroke='#010101' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/>"
      +"  </symbol>"
      +"  <use class='arr-up'   width='176' height='176' x='-88' y='-88' xlink:href='#a' transform='matrix(1 0 0 -1 89 89)' overflow='visible'/>"
      +"  <use class='arr-down' width='176' height='176' x='-88' y='-88' xlink:href='#a' transform='matrix(-1 0 0 1 89 89)' overflow='visible'/>"
      +"  <use class='arr-top'  width='176' height='176' x='-88' y='-88' xlink:href='#a' transform='matrix(1 0 0 -1 89 89)' overflow='visible'/>"
      +"  <line class='arr-top' x1='61' x2='117' y1='13' y2='13' fill='none' stroke='#010101' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/>"
      +"</svg>";

    var blankCandidateMarkup = "<li>" 
    + "<img class='mugshot' src='%(mug)s'><table>" 
    + "  <tr>" 
    + "    <td class='name'>%(name)s</td>" 
    + "    <td class='arrow up'  >"+arrows+"</td>" 
    + "    <td class='arrow down'>"+arrows+"</td>" 
    + "    <td class='arrow top' >"+arrows+"</td>" 
    + "  </tr>" 
    + "</table>" 
    + "</li>";
    candidates = shuffle(candidates);
    for (i in candidates) {
        var person = candidates[i]
        var candidateMarkup = sprintf(blankCandidateMarkup, person);
        $("#candidate-sortable").append(candidateMarkup);
    }

    //insert "don't care" line
    var unrankedLine = sprintf(blankCandidateMarkup, {
        "name": "Unranked Below",
        "mug": "mugs/Twitter.png"
    });
    unrankedLine = unrankedLine.replace(/<li>/, "<li class='unranked-line'>");
    $("#candidate-sortable li:eq(4)").after(unrankedLine);

    //ui controls
    $('.up').click(function() {
        var liItem = $(this).closest("li");
        if (liItem.prev().is('li')) {
            liItem.insertBefore(liItem.prev())
        }
    });

    $('.down').click(function() {
        var liItem = $(this).closest("li");
        if (liItem.next().is('li')) {
            liItem.insertAfter(liItem.next())
        }
    });
    $('.top').click(function() {
        var liItem = $(this).closest("li");
        $("#candidate-sortable").prepend(liItem);
    });

    $(".vote-button").click(function() {
        var ballot = {};
        ballot["aaa_email"] = $("[name=user_email]").val();
        ballot["aaa_timestamp"] = new Date(Date.now());

        var peeps = $("#candidate-sortable li .name");
        var stoppedCaring = false;
        var stoppedCaringAt = -1;
        var uniformScore = -1;
        for (var i = 0; i < peeps.length; i++) {
            var key = peeps[i].innerText;
            if (!stoppedCaring) {
                if (key != "Unranked Below") {
                    ballot[key] = i;
                } else {
                    stoppedCaring = true;
                    uniformScore = ((peeps.length - 1 - i) / 2) + i;
                }
            } else {
                ballot[key] = uniformScore;
            }
        }

        console.log(JSON.stringify(ballot));
        console.log(ballot);

        $("#entry_1847381329").val(JSON.stringify(ballot));
        $("[name=submit]").trigger("click");
    });

    // var el = document.getElementById('candidate-sortable');
    // var sortable = Sortable.create(el);
});

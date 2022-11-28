// arrays
var filter_attrs_arr = [];
var exceptions_obj = [];

// when any checkbox is clicked:
$('.collection-filters input[type=checkbox]').change(function() {
    updateAllBlocks();
});

function updateAllBlocks() {

    var sidebar_groups_obj = [];

    // loop through each filter group in sidebar to find match
    $('.filter-group').each(function(e) {

        var checked_boxes_arr = [];
        
        // populate array from checked boxes in filter group
        $(this).find('input[type=checkbox]').each(function(e) {
            if ($(this).is(':checked')) {
                checked_boxes_arr.push($(this).val());
            }
        });

        // push filter group array into main groups array
        var group_title = $(this).attr('data-block-attr-name');
        sidebar_groups_obj[group_title] = checked_boxes_arr;

    });

    // add exceptions to filter groups
    sidebar_groups_obj = Object.assign(exceptions_obj, sidebar_groups_obj);

    // console.log("———————SIDEBAR FILTER GROUPS——————");
    // console.log(sidebar_groups_obj);
    // console.log("———————PRODUCT BLOCKS——————");

    // loop all product blocks to find matches to groups    
     $('.grid__item').each( function(e) {

        var block_groups_ojb = [];

         for (const filter_attr of filter_attrs_arr) {
            if ($(this).attr(filter_attr)) {
                filter_attr_arr = $(this).attr(filter_attr).split(" ");
                block_groups_ojb[filter_attr] = filter_attr_arr;
            }
         }
        //console.log(block_groups_ojb);
 
        // compare sidebar and block arrays

        var match_arr = [];

        // loop through possible filter groups
        for (var filter_name of filter_attrs_arr) {
            // loop though block attrs
            for (var block_val of block_groups_ojb[filter_name]) {
                // if black attr val is in matching sidebar group arr...
                if (sidebar_groups_obj[filter_name].indexOf(block_val) >=0 ) {
                    match_arr.push(filter_name);
                }
            }
        }
        // if number of matches in groups = total number of groups, show
        var unique_match_arr = [...new Set(match_arr)];
        // console.log(unique_match_arr);
        // console.log(unique_match_arr.length + " — " + filter_attrs_arr.length);
        if (unique_match_arr.length == filter_attrs_arr.length) {
            //console.log($(this).html());
            $(this).fadeIn(200);
        } else {
            $(this).fadeOut(150);
        }

     });
}
console.log("————————————––––—");

// compare 2 arrays for matches
function isIn(elmt_vals, chkd_vals) {
    var isin = elmt_vals.some((val) => chkd_vals.indexOf(val) !== -1);
    return isin;
}

// deselect all sizes when one is clicked for the first time
$('.filter-group-size label').click(function() {
    if($('.filter-group-size :checkbox:not(:checked)').length == 0){ 
        $(".filter-group-size input").prop('checked', false);
        $(this).prop('checked', true);
    }
    if($('.filter-group-size :checkbox:not(:checked)').length == 0){ 
        $('.re-select-all').hide();
    } else {
        $('.re-select-all').show();
    }
});

// re-select all sizes button
$('.re-select-all').click(function() {
    $(this).parent().find("input").prop('checked', true);
    $(this).hide();
    updateAllBlocks();
});

// get attributes and set var
function setUp() {
    // set array of data-filter- attrs from main page markup
    $('.grid__item:first').each(function() {
        $.each(this.attributes, function() {
            if(this.specified) {
                if (this.name.includes("data-filter-")) {
                    filter_attrs_arr.push(this.name);
                }
            }
        });
    });
    //console.log('ATTRS: '+filter_attrs);

    // set array of exceptions: hidden sidebar filter groups (those with only one choice)
    $('.filter-group-hidden').each(function(e) {
        var exception = [];
        exception.push($(this).attr('data-exception'));
        var exception_title = $(this).attr('data-block-attr-name');
        exceptions_obj[exception_title] = exception;
    });
}

// set state for desktop / mobile
$(document).ready(function() {
    var windowWidth = $(window).width();
    if(windowWidth <= 790) { // small screen
       $('.tt-item').removeClass('active');
       $('.collapse-content').css('display', "none");
    }

    setUp();

});
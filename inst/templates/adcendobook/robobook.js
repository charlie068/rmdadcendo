$(document).ready(function() {
    // Fix for dots in level 1 and level 2 titles
    $('body .section.level1').each(function () {
        $(this).attr("id", $(this).attr("id").replace(/\./g, "-"));
    });
    $('body .section.level2').each(function () {
        $(this).attr("id", $(this).attr("id").replace(/\./g, "-"));
    });
    $('body .section.level3').each(function () {
        $(this).attr("id", $(this).attr("id").replace(/\./g, "-"));
    });
    
    // Replace dots with hyphens in all href attributes at all levels
    $('#toc a').each(function() {
        $(this).attr("href", $(this).attr("href").replace(/\./g, "-"));
    });
    
    // Improved handling of TOC menu clicks
    $('#toc li > a').click(function(e) {
        var $parent = $(this).parent('li');
        var $submenu = $parent.find('> ul');
        
        // If the clicked item has a submenu
        if ($submenu.length) {
            // Don't prevent default navigation
            // Just toggle the active class for dropdown visibility
            $parent.toggleClass('active');
            
            // Optional: Close other open menus at the same level
            $parent.siblings('li').removeClass('active');
            
            // If we want to add a double-click feature for parent items, we could do:
            // Let navigation happen naturally!
        }
    });
    
    if ($(document).width() <= 1000) {
        $(".book").removeClass("with-summary");
    }
    
    // Shift nav in mobile when clicking the menu.
    $(document).on('click', ".toggle-sidebar", function() {
        $(".book").toggleClass("with-summary");
    });
    
    // ScrollSpy also requires that we use a Bootstrap nav component.
    $('#toc ul').first().addClass('nav');
    $('.book-body').scrollspy({target: '#toc'});
    $("body").removeClass("preload");
    
    // Use the complete selector path to match the CSS
    var pillTabSelector = ".book .book-body .page-inner section.normal .nav-pills > li > a";
    
    // Initialize: Mark the first tab as active if no tab is active
    var $pillTabsContainers = $(".book .book-body .page-inner section.normal .nav-pills");
    $pillTabsContainers.each(function() {
        var $tabs = $(this).find("> li");
        if ($tabs.filter(".active").length === 0) {
            $tabs.first().addClass("active");
        }
    });
    
    // Add click handler with full selector path
    $(document).on("click", pillTabSelector, function(e) {
        var $clickedTab = $(this);
        var $allTabs = $clickedTab.closest(".nav-pills").find("> li");
        var $currentTab = $clickedTab.parent("li");

        // Mark ALL previously active tabs as visited
        $allTabs.filter(".active").addClass("visited");

        // Mark first tab as visited if we're clicking on a different tab
        // and the first tab isn't already marked as visited
        if (!$currentTab.is($allTabs.first()) && !$allTabs.first().hasClass("visited")) {
            $allTabs.first().addClass("visited");
        }

        // Set the current tab as active (remove from others)
        $allTabs.removeClass("active");
        $currentTab.addClass("active");
    });

    // Fix DataTables header/body alignment issues
    // This fixes the common problem where scrolling tables have misaligned headers
    function fixDataTableAlignment() {
        $('.dataTables_wrapper').each(function() {
            var $wrapper = $(this);
            var $scrollHead = $wrapper.find('.dataTables_scrollHead');
            var $scrollBody = $wrapper.find('.dataTables_scrollBody');

            if ($scrollHead.length && $scrollBody.length) {
                // Get the actual table in the body
                var $bodyTable = $scrollBody.find('table');
                var $headTable = $scrollHead.find('table');

                if ($bodyTable.length && $headTable.length) {
                    // Force recalculation of column widths
                    var colWidths = [];
                    $bodyTable.find('tr').first().find('td, th').each(function(index) {
                        colWidths[index] = $(this).outerWidth();
                    });

                    // Apply the same widths to header columns
                    $headTable.find('tr').first().find('th').each(function(index) {
                        if (colWidths[index]) {
                            $(this).css('width', colWidths[index] + 'px');
                        }
                    });

                    // Sync scroll positions
                    $scrollBody.on('scroll', function() {
                        $scrollHead.scrollLeft($scrollBody.scrollLeft());
                    });
                }
            }
        });
    }

    // Fix alignment when DataTables are initialized
    $(document).on('init.dt', function(e, settings) {
        setTimeout(fixDataTableAlignment, 100);
    });

    // Fix alignment after any DataTable draw/redraw
    $(document).on('draw.dt', function(e, settings) {
        setTimeout(fixDataTableAlignment, 100);
    });

    // Fix alignment on window resize
    $(window).on('resize', function() {
        setTimeout(fixDataTableAlignment, 100);
    });

    // Initial fix on page load (with delay to ensure DataTables are rendered)
    setTimeout(fixDataTableAlignment, 500);
});

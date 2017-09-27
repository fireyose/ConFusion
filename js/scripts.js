// jQuery first, then Tether, then Bootstrap JS
<script src="node_modules/jquery/dist/jquery.min.js"></script>
<script src="node_modules/tether/dist/js/tether.min.js"></script>
<script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>

<script>
    $(document).ready(function() {
        $('#mycarousel').ready(function() {
            $('#mycarousel').carousel( {interval: 2000} );
        });

        $('#carousel-button').click(function() {
            if ($('#carousel-button').children('span').hasClass('fa-pause')) {
                $('#mycarousel').carousel('pause');
                $('#carousel-button').children('span').removeClass('fa-pause');
                $('#carousel-button').children('span').addClass('fa-play');
            } else if ($('#carousel-button').children('span').hasClass('fa-play')) {
                $('#mycarousel').carousel('cycle');
                $('#carousel-button').children('span').removeClass('fa-play');
                $('#carousel-button').children('span').addClass('fa-pause');
            }
        });

    });
</script>
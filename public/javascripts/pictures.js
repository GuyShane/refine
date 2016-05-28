$(document).ready(()=>{
    let idx=0;
    const imgs=[];

    $('.thumb').each(function(){
	let s=$(this).attr('src');
	s=s.split('/');
	imgs.push('images/gallery/pictures/'+s[s.length-1].replace('_thumb',''));
    });
    
    $('.thumb').on('click',function(){
	let s=$(this).attr('src');
	idx=$('.thumb').index($(this));
	load_imgs(idx);
	s=s.split('/');
	s='images/gallery/pictures/'+s[s.length-1].replace('_thumb','');
	$('#modal-image').attr('src',s);
    });

    $(document).on('keydown',function(event){
	if (!$('#modal-image').is(':hidden')){
	    if (event.which==37){$('#prev-img').mouseenter();}
	    else if (event.which==39){$('#next-img').mouseenter();}
	}
    });

    $(document).on('keyup',function(event){
	if (!$('#modal-image').is(':hidden')){
	    if (event.which==37){
		$('#prev-img').mouseleave();
		prev_img();
	    }
	    else if(event.which==39){
		$('#next-img').mouseleave();
		next_img();
	    }
	}
    });

    $('#next-img').on('click',function(){
	next_img(idx);
    });

    $('#prev-img').on('click',function(){
	prev_img();
    });
    
    function next_img(){
	idx=(idx+1)%imgs.length;
	change_img(idx);
    }

    function prev_img(){
	idx=(idx-1)%imgs.length;
	if (idx<0){idx=imgs.length-1;}
	change_img(idx);
    }

    function change_img(i){
	$('#modal-image').fadeTo(160,0.4,function(){
	    $('#modal-image').attr('src',imgs[i]);
	    $('#modal-image').fadeTo(160,1);
	});
	load_imgs(i);
    }

    function load_imgs(i){
	i_p=norm_idx(i-1);
	i_n=norm_idx(i+1);
	$('#load-prev').attr('src',imgs[i_p]);
	$('#load-next').attr('src',imgs[i_n]);
    }

    function norm_idx(i){
	if (i<0){return imgs.length-1;}
	return i%imgs.length;
    }
});

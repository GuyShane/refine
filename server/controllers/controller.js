const fs=require('fs');

var navbar={
    'Home': {
	destination: '/',
	active: false
    },
    'Gallery': {
	destination: '/gallery',
	active: false
    },
    'Testimonials': {
	destination: '/testimonials',
	active: false
    },
    'Contact': {
	destination: '/contact',
	active: false
    }
}

var set_active_link=function(active){
    for (link in navbar){
	if (!navbar.hasOwnProperty(link)){continue;}
	if (link==active){navbar[link]['active']=true;}
	else {navbar[link]['active']=false;}
    }
}

module.exports.home_page=function(req,res){
    set_active_link('Home');
    res.render('index',{
	title: 'Refine Renovations | Home',
	navbar_links: navbar,
	paragraphs: [
	    'Refine Renovations is in business for one reason. We want show you how well 20 full time, highly skilled trades people can complete your project - on time and on budget. Most of our trades people have been employed by Refine Renovations for 10 years. Each team member specialises in a particular area. We believe having the right person for each job produces the best results. We are proud of our trades people and the high quality work we do.',
	    'Let Refine give you the skill and the attention you deserve at a price you can afford. All work is managed by a Civil Engineer, the President, James Belovich.'
	],
	services: [
	    {description: 'Design', src: 'images/service_design.png'},
	    {description: 'Additions', src: 'images/service_additions.png'},
	    {description: 'Kitchens', src: 'images/service_kitchens.png'},
	    {description: 'Bathrooms', src: 'images/service_bathrooms.png'},
	    {description: 'Floors', src: 'images/service_floors.png'},
	    {description: 'Basements', src: 'images/service_basements.png'},
	    {description: 'New construction', src: 'images/service_new.png'},
	    {description: 'Repairs and maintenance', src: 'images/service_repairs.png'}
	]
    });
}

module.exports.gallery=function(req,res){
    set_active_link('Gallery');
    fs.readdir('public/images/gallery/thumbs',(err,files)=>{
	const thumbs=[];
	for (f of files){
	    f='images/gallery/thumbs/'+f;
	    thumbs.push(f);
	}
	res.render('gallery',{
	    title: 'Refine Renovations | Gallery',
	    navbar_links: navbar,
	    thumbs: thumbs
	});
    });
}

module.exports.testimonials=function(req,res){
    set_active_link('Testimonials');
    res.render('testimonials',{
	title: 'Refine Renovations | Testimonials',
	navbar_links: navbar
    });
}

module.exports.contact=function(req,res){
    set_active_link('Contact');
    res.render('contact',{
	title: 'Refine Renovations | Contact',
	navbar_links: navbar
    });
}

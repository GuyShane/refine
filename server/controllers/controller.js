const fs=require('fs');
const request=require('request');
const mailgun=require('mailgun-js')({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
});

const send_response=function(res,status,content){
    res.status(status);
    res.json(content);
};

const contact_redirect=function(req,res,status){
    req.flash('status',status);
    res.redirect('/contact');
}

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
    const page_data={
	title: 'Refine Renovations | Contact',
	navbar_links: navbar
    };
    const status=req.flash('status');
    if (status){
	page_data.status=status[0];
    }
    res.render('contact',page_data);
}

module.exports.send_email=function(req,res){
    //Make sure the form had everything we need
    if (!req.body.name || !req.body.email || !req.body.message){
	contact_redirect(req,res,'warning');
    }

    //Send recaptcha data to Google
    const captcha_opts={
	url: 'https://www.google.com/recaptcha/api/siteverify',
	method: 'POST',
	json: {
	    secret: process.env.RECAPTCHA_SECRET,
	    response: req.body['g-recaptcha-response'],
	    remoteip: req.ip
	}
    };
    request(captcha_opts,(error,response,body)=>{
	if (error){ //Captcha was failed
	    contact_redirect(req,res,'danger');
	}
	else {
	    //Send email
	    const data={
		from: req.body.name+' <'+req.body.email+'>',
		to: 'shanebrass1618@gmail.com',
		subject: 'email',
		text: req.body.message
	    };
	    mailgun.messages().send(data,(error,body)=>{
		let status;
		if (error){
		    console.log('email error',error);
		    status='danger';
		}
		else {
		    status='success';
		}
		contact_redirect(req,res,status);
	    });
	}
    });
}

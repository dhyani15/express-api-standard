const checkMillionDollarIdea = (req,res,next) => {
    let numWeeks = Number(req.body.numWeeks);
    let weeklyRevenue = Number(req.body.weeklyRevenue);
    let worth = numWeeks*weeklyRevenue;
    if (worth >=1000000){
        next();
    } else {
        res.status(400).send()
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;

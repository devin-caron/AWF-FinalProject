const express = require('express');
const router = express.Router();
const authenticate = require('./verify-token');
const Joi = require('joi');

// Models
const EducationTasksModel = require('../models/CategoryModels/EducationTasksModel');
const WorkTasksModel = require('../models/CategoryModels/WorkTaskModel');
const ActivitiesTaskModel = require('../models/CategoryModels/ActivitiesTasksModel');
const PersonalTasksModel = require('../models/CategoryModels/PersonalTasksModel');
const OtherTasksModel = require('../models/CategoryModels/OtherTasksModel');


router.post('/update', authenticate, async (req, res) => {

    // console.log(req.user._id);

    // Validation Schema for an array of tasks
    const validationSchema = Joi.array().items(Joi.object({
        id: Joi.number(),
        category: Joi.string(),
        title: Joi.string(),
        description: Joi.string(),
        urgency: Joi.string().optional().allow(''),
        status: Joi.string(),
        isCollapsed: Joi.boolean(),
        _id: Joi.string()
    }));

    // Validate request data
    const valid = validationSchema.validate(req.body);
    if(valid.error !== undefined){
        console.log(valid.error);
        return res.status(400).send('Incorrect request data.')
    }



    let success = false;
    switch (req.headers.category) {
        case "Education":
            console.log('UPDATE THE Education TASKS!!');
            success = await handleEducationTasks(req);
            if(success) return res.status(200).send('Education Tasks Updated Succesfully');
            else return res.status(400).send('Erro while trying to update Education Tasks');
            break;
        case "Work":
            console.log('UPDATE THE Work TASKS!!');
            success = handleWorkTasks(req);
            if(success) return res.status(200).send('Work Tasks Updated Succesfully');
            else return res.status(400).send('Erro while trying to update Work Tasks');
            break;
        case "Activities":
            success = handleActivitiesTasks(req);
            if(success) return res.status(200).send('Activities Tasks Updated Succesfully');
            else return res.status(400).send('Erro while trying to update Activities Tasks');
            break;
        case "Personal":
            success = handlePersonalTasks(req);
            if(success) return res.status(200).send('Personal Tasks Updated Succesfully');
            else return res.status(400).send('Erro while trying to update Personal Tasks');
            break;
        case "Other":
            success = handleOtherTasks(req);
            if(success) return res.status(200).send('Other Tasks Updated Succesfully');
            else return res.status(400).send('Erro while trying to update Other Tasks');
            break;
        default:
            break;
    }
    
    
});


router.get('/education', authenticate, async (req, res) => {
    const tasksRecord = await EducationTasksModel.findOne({userID: 'user'+req.user._id});
    if(!tasksRecord){
        return res.status(400).send('Unable to find the tasks for the user.')
    }else{
        res.status(200).send(tasksRecord.tasks);
    }
});


router.get('/work', authenticate, async (req, res) => {
    const tasksRecord = await WorkTasksModel.findOne({userID: 'wuser'+req.user._id});
    if(!tasksRecord){
        return res.status(400).send('Unable to find the tasks for the user.')
    }else{
        res.status(200).send(tasksRecord.tasks);
    }
});

router.get('/activities', authenticate, async (req, res) => {
    const tasksRecord = await ActivitiesTaskModel.findOne({userID: 'auser'+req.user._id});
    if(!tasksRecord){
        return res.status(400).send('Unable to find the tasks for the user.')
    }else{
        res.status(200).send(tasksRecord.tasks);
        console.log(tasksRecord.tasks);
    }
});

router.get('/personal', authenticate, async (req, res) => {
    const tasksRecord = await PersonalTasksModel.findOne({userID: 'puser'+req.user._id});
    if(!tasksRecord){
        return res.status(400).send('Unable to find the tasks for the user.')
    }else{
        res.status(200).send(tasksRecord.tasks);
        console.log(tasksRecord.tasks);
    }
});

router.get('/other', authenticate, async (req, res) => {
    const tasksRecord = await OtherTasksModel.findOne({userID: 'ouser'+req.user._id});
    if(!tasksRecord){
        return res.status(400).send('Unable to find the tasks for the user.')
    }else{
        res.status(200).send(tasksRecord.tasks);
        console.log(tasksRecord.tasks);
    }
});



async function handleEducationTasks(req){

    // Find one and update the array
    const userExits = await EducationTasksModel.findOne({userID: 'user'+req.user._id})
    if(userExits){
        // Update the tasks array
        await EducationTasksModel.findOneAndUpdate({userID: 'user'+req.user._id}, {$set: {tasks: req.body}})
        console.log('User exits');
    }else{
        const newEducationTasksModel = new EducationTasksModel({
            userID: 'user'+req.user._id,
            tasks: req.body
        });
        newEducationTasksModel.save();
        console.log('User does not exist!');
        return false;
    }
    
    console.log('RAdi?????');
    return true;
}

async function handleWorkTasks(req){
    
    const lookupId = 'wuser'+req.user._id;
    // Find one and update the array
    const userExits = await WorkTasksModel.findOne({userID: lookupId})
    if(userExits){
        // Update the tasks array
        await WorkTasksModel.findOneAndUpdate({userID: lookupId}, {$set: {tasks: req.body}})
        console.log('User exits');
    }else{
        const newWorkTasksModel = new WorkTasksModel({
            userID: lookupId,
            tasks: req.body
        });
        newWorkTasksModel.save();
        console.log('User does not exist!');
        return false;
    }
    
    console.log('RAdi?????');
    return true;
}

async function handleActivitiesTasks(req){
    
    const lookupId = 'auser'+req.user._id;
    // Find one and update the array
    const userExits = await ActivitiesTaskModel.findOne({userID: lookupId})
    if(userExits){
        // Update the tasks array
        await ActivitiesTaskModel.findOneAndUpdate({userID: lookupId}, {$set: {tasks: req.body}})
    }else{
        const newActivitiesTaskModel = new ActivitiesTaskModel({
            userID: lookupId,
            tasks: req.body
        });
        newActivitiesTaskModel.save();
        return false;
    }
    return true;
}

async function handlePersonalTasks(req){
    
    const lookupId = 'puser'+req.user._id;
    // Find one and update the array
    const userExits = await PersonalTasksModel.findOne({userID: lookupId})
    if(userExits){
        // Update the tasks array
        await PersonalTasksModel.findOneAndUpdate({userID: lookupId}, {$set: {tasks: req.body}})
    }else{
        const newPersonalTasksModel = new PersonalTasksModel({
            userID: lookupId,
            tasks: req.body
        });
        newPersonalTasksModel.save();
        return false;
    }
    return true;
}

async function handleOtherTasks(req){
    
    const lookupId = 'ouser'+req.user._id;
    // Find one and update the array
    const userExits = await OtherTasksModel.findOne({userID: lookupId})
    if(userExits){
        // Update the tasks array
        await OtherTasksModel.findOneAndUpdate({userID: lookupId}, {$set: {tasks: req.body}})
    }else{
        const newOtherTasksModel = new OtherTasksModel({
            userID: lookupId,
            tasks: req.body
        });
        newOtherTasksModel.save();
        return false;
    }
    return true;
}




module.exports = router;
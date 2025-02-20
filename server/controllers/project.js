const Project = require('../models/project')

module.exports = class ProjectController {
    static create (req, res, next) {
        const { name, todos } = req.body
        const users = req.body['users[]']
    
       Project.create({ name, users, todos })
            .then( project => {
                res.status(201).json(project)
            })
            .catch(next)
    }

    static findAll (req, res, next) {

        console.log(req.decoded._id)
        
        Project.find()
        .then( projects => {
                let userProject = projects.filter(x => x.users.includes(req.decoded._id))
                res.status(200).json(userProject)
            })
            .catch(next)
    }

    static findOne (req, res, next) {
       Project.findById(req.params.projectId)
            .then( project => {
                res.status(200).json(project)
            })
            .catch(next)
    }

    static updateOne (req, res, next) {
        let update = {}
        const { name, users, todos } = req.body

        name && (update.name = name)
        users && (update.users = users)
        todos && (update.todos = todos)

       Project.findByIdAndUpdate(req.params.projectId, { $set: update }, { new: true, runValidators: true })
            .then( project => {
                res.status(200).json(project)
            })
            .catch(next)
    }

    static deleteOne (req, res, next) {
       Project.findByIdAndDelete(req.params.projectId)
            .then( project => {
                res.status(200).json(project)
            })
            .catch(next)
    }
}


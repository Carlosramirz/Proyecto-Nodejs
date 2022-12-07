import { Router } from 'express';
import Task from '../models/Task';



const router=Router();

router.get('/', (req, res) => {
    res.render('index')
});

router.get('/', async (req, res) => {
    let errors = [];
    const {nombres, apeliidos, correo, telefono, contraseña } = req.body;
    if (contraseña !== confirm_contraseña) {
        errors.push({ text: 'Contraseña no coinciden'});
    }

    if (contraseña.length < 4){
        errors.push({ text: 'Contraseña debe tener por lo menos 4 caracteres'});
    }

    if (errors.length > 0) {
        return res.render()
    }

})

router.post('/tasks/add', async (req, res) => {
    
    const {nombres, apeliidos, correo, telefono, contraseña } = req.body;
    
    try {
    

    const nuevoUsuario = new Task({ nombres, apeliidos, correo, telefono, contraseña });
    nuevoUsuario.contraseña = await nuevoUsuario.encryptPassword(contraseña);
    await nuevoUsuario.save();
    res.redirect('/')

    }    
    catch (error){
        console.log(error)
    }

    
});


router.get('/about.hbs', (req, res) => {
    res.render('about')
});

router.get('/conductor.hbs', (req, res) => {
    res.render('conductor')
});

router.get('/pasajero.hbs', (req, res) => {
    res.render('pasajero')
});

router.get('/admin.hbs', async (req, res) => {
    const tasks = await Task.find().lean() 
    res.render('admin', { tasks: tasks})
});

router.get('/edit/:id', async (req, res) =>{
    try{
        const task = await Task.findById(req.params.id).lean()
        res.render('edit', {task});
    }
    catch(error){
        console.log(error.message);
    }
});

router.post('/edit/:id', async (req, res)=>{

    const {id} = req.params;

    await Task.findByIdAndUpdate(id, req.body);

    res.redirect("/admin.hbs");
});

router.get('/eliminar/:id', async (req, res) =>{
    const {id} = req.params;
    await Task.findByIdAndDelete(id);
    res.redirect("/admin.hbs");
});

export default router;
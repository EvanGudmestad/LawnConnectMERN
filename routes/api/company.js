import express from 'express';

const router = express.Router();

let companies = [
  { id: '1', name: 'Green Thumb Lawn Care', services: ['mowing', 'trimming'], rating: 4.8 },
  { id: '2', name: 'Fast Mow Landscaping', services: ['mowing', 'fertilizing'], rating: 4.5 }
];

router.get('/',(req,res) =>{
  res.status(200).json(companies);
});


router.get('/:id', (req,res) =>{
  const company = companies.find(c => c.id === req.params.id);
  if(!company) return res.status(404).send('Company not found');
  res.status(200).json(company);
});

router.post('/', (req,res) => {
 // res.json(req.body);
  const newCompany = {
    id: (companies.length + 1).toString(),
    ...req.body
  };
  companies.push(newCompany);
  res.status(201).json(newCompany);
});

router.put('/:id', (req, res) =>{
  const companyIndex = companies.findIndex(c => c.id === req.params.id);
  if(companyIndex === -1) return res.status(404).send('Company not found');
  companies[companyIndex] = {...companies[companyIndex], ...req.body};
  res.status(200).json(companies[companyIndex]);
});

router.delete('/:id', (req,res) =>{
  const initialLength = companies.length;
  companies = companies.filter(c => c.id !== req.params.id);
  if(companies.length === initialLength) return res.status(404).send('Company not found');
  res.status(204).send("Company deleted");
});

export {router as companyRouter};

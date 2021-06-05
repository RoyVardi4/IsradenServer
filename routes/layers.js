import express from 'express'

const router = express.Router()

let layers = []

// POST
router.post('/', async (req, res) => {
  const newLayer = req.body
  console.log(newLayer)
  layers.push(newLayer)
  res.json(newLayer)
})

router.get('/', async (req, res) => {
  res.json(layers)
})


// module.exports = router
export default router
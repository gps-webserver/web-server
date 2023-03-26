const express = require('express');
const router = express.Router();
const app = express();
  

router.get('/pagina-historicos', (req, res) => {
  res.render('pagina-historicos', {
    title: 'historicos'
  })
});

/* router.get('/', (req, res) => {
  res.render('index', {
    title: 'Pagina diseño'
  })
}); */

module.exports = router;

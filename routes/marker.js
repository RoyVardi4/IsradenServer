import express from 'express'

const router = express.Router()

let markers = []
let clients = []

function eventsHandler(request, response, next) {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  response.writeHead(200, headers);

  const data = `data: ${JSON.stringify(markers)}\n\n`;

  response.write(data);

  const clientId = Date.now();

  const newClient = {
    id: clientId,
    response
  };

  clients.push(newClient);

  request.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(client => client.id !== clientId);
  });
}

function sendEventsToAll(newMarker) {
  clients.forEach(client => client.response.write(`data: ${JSON.stringify(newMarker)}\n\n`))
}

router.get('/status', (request, response) => response.json({clients: clients.length}));

router.get('/events', eventsHandler);

// POST
router.post('/', async (req, res) => {
  const newMarker = req.body;
  markers.push(newMarker);
  res.json(newMarker)
  return sendEventsToAll(newMarker);
})


// module.exports = router
export default router
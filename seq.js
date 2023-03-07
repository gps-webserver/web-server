import dgram from 'node:dgram';
import { Sequelize }  from 'sequelize';
import cors from 'cors';
import express, { json } from "express";
import { QueryTypes } from "sequelize";




const sequelize = new Sequelize('gps', 'root', '12345', { dialect: 'mysql' })
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', async (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  const obj = JSON.parse(msg);
  const [results, metadata] = await sequelize.query(`INSERT INTO coordenadas VALUES (null,${obj.latitud},${obj.longitud},\"${obj.fecha}\",\"${obj.hora}\",\"${rinfo.address}\")`);
  console.log(metadata);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind({
  address: '192.168.1.5',
  port: 52000,
  exclusive: true,
});
const app = express();
app.use(cors());
app.use(json());
const port = 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/', function (req, res) {
    try {
        const query = `
        SELECT * FROM gps.coordenadas WHERE id=(SELECT MAX(id) FROM gps.coordenadas);`;
    
         sequelize.query(query, {
          type: QueryTypes.SELECT,
        }).then(result=>res.status(200).json(result));
      
      } catch (err) {
        res.status(500).json({
          message: err.message || "Some error occurred while retrieving invoices.",
        });
      }
    
  });
  
export default sequelize
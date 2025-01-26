import app from "./"
import cluster from "node:cluster"
import logger from "./utils/logger"

const port = 3000
const numCPUs = Number(process.env.CPU || 2)

// cluster.isPrimary is responsible for respawning node workers
if (cluster.isPrimary) {
  logger.debug(`Primary ${process.pid} is running`)

  for (let i = 0; i < numCPUs; i++) {
    // respawn workers
    const worker = cluster.fork()
    logger.debug(`Booting worker with pid ${worker.process.pid}`)
  }

  cluster.on("exit", (worker, _code) => {
    logger.debug(`Worker ${worker.process.pid} died. Forking another one.`)
    cluster.fork()
  })
} else {
  // run non-cluster node server
  app.listen(port, () => {
    logger.debug(`Worker ${process.pid} started.`)
  })
}

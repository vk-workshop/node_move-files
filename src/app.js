/* eslint-disable no-console */
const fs = require('fs').promises;
const path = require('path');

async function moveFile() {
  try {
    const [pathFrom, pathTo] = process.argv.slice(2);

    const absPathFrom = path.resolve(pathFrom);
    const absPathTo = path.resolve(pathTo);

    if (!fs.existsSync(absPathFrom)) {
      throw new Error('Path does not exist!');
    }

    const sourceStats = await fs.stat(absPathFrom);

    if (!sourceStats.isFile()) {
      throw new Error('There is no file!');
    }

    let destinationPath = absPathTo;

    if (absPathTo.endsWith('/')) {
      const fileName = path.basename(pathFrom);

      destinationPath = path.join(absPathTo, fileName);

      if (!fs.existsSync(absPathTo)) {
        throw new Error('Path already exists!');
      }
    }

    await fs.rename(absPathFrom, destinationPath);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

moveFile();

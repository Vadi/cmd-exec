const process = require('process');
const { execSync, exec } = require('child_process');
const fs = require('fs');

const args = process.argv.slice(2);


if (args.length !== 1) {
    console.error(`Usage: ${process.argv[1]} commands.json`);
    process.exit(-1)
}

try {

    // read the file
    const jsonData = fs.readFileSync(args[0]);

    if (jsonData.length === 0) {
        console.error("no commands found, exiting process..");
        process.exit(-1)
    }

    const commandData = jsonData.toString('utf8');
    const commands = JSON.parse(commandData)

    for (let i = 0; i < commands.length; i++) {
        const cmd = commands[i];
        const result = execSync(cmd, {
            cwd: __dirname,
            stdio: 'pipe'
        }).toString()

        console.log(cmd)
        console.log("\t", result)
    }
} catch (err) {
    console.error("Error occurred .. exiting")
    console.error(err)
    process.exit(-1)
}
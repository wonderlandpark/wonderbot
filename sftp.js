const sftpClient = require('node-ssh')
const sftp = new sftpClient()
const chalk = require('chalk')
const path = require('path')
const { readFileSync, mkdirSync, existsSync, unlinkSync } = require('fs')
const { execSync } = require('child_process')
const logger = {
    debug: text => console.log(chalk.rgb(66, 135, 245)(text)),
    info: text => console.log(chalk.hex('#3eedf0')(text)),
    alert: text => console.warn(chalk.hex('#fa564d')(text)),
    global: text => console.log(chalk.hex('#ffebcc')(text))
}

sftp.connect({
    host: process.env.HOST,
    port: 22,
    username,
    password: process.env.PASSWORD
}).then(async() => {
    logger.info('[SFTP] [Connection] SFTP Connection successfully stabilized.')

    if(!existsSync(__dirname + '/cache/')) mkdirSync(__dirname + '/cache/')
    if (!existsSync(__dirname + '/cache/package.json')) execSync('touch cache/package.json')

    sftp.getFile(__dirname + '/cache/package.json', remotePath + packageJsonDir)
        .then(() => {
            let depend = JSON.parse(readFileSync(__dirname + '/cache/package.json', { encoding: 'utf-8' })).dependencies
            let newDepend = JSON.parse(readFileSync(__dirname + '/package.json', { encoding: 'utf-8' })).dependencies

            let dependKeys = Object.keys(depend)
            let newDependKeys = Object.keys(newDepend)

            let result = []

            for(let i = 0; i < newDependKeys.length; i++) {
                dependKeys[i] !== newDependKeys[i] ? result.push(false) : result.push(true)
                depend[newDependKeys[i]] !== newDepend[dependKeys[i]] ? result.push(false) : result.push(true)

                logger.debug(`[SFTP] Scanned ${dependKeys[i]} and ${newDependKeys[i]}. Result: ${dependKeys[i] !== newDependKeys[i] ? false : true}`)
                logger.debug(`[SFTP] Scanned versions of ${dependKeys[i]} and ${newDependKeys[i]}. Result: ${depend[newDependKeys[i]] !== newDepend[dependKeys[i]] ? false : true}`)
            }

            setTimeout(() => {
                if(result.includes(false)) upload(true)
                else upload(false)
            }, 500)
        })

    var upload = installDependencies => {
        const deniedFiles = [
            'LICENSE',
            'package-lock.json',
            'README.md',
            'sftp.js'
        ]

        const failed = []
        const successful = []

        sftp.putDirectory(__dirname, remotePath, {
            recursive: true,
            concurrency: 5,
            validate: itemPath => {
                const baseName = path.basename(itemPath)
                return (
                    (baseName.substr(0, 1) !== '.' && baseName !== '.env') &&
                    baseName !== 'node_modules' &&
                    !deniedFiles.includes(baseName)
                )
            },
            tick: (localPath, remotePath, error) => {
                const baseName = path.basename(localPath)

                if (error) {
                    logger.alert(
                        '[SFTP] [Transfer] Failed to transfer ' +
                            baseName +
                            ' file.'
                    )
                    failed.push({ path: localPath, error })
                } else {
                    logger.global(
                        '[SFTP] [Transfer] Successfully transfered ' +
                            baseName +
                            ' file.'
                    )
                    successful.push(localPath)
                }
            }
        }).then(async () => {
            logger.alert('Failed transfers: ' + failed.length)
            logger.debug('Successful transfers: ' + successful.length)

            if(installDependencies) {
                await sftp.execCommand(`echo ${process.env.PASSWORD} | sudo -S npm install`, {
                    cwd: remotePath
                })
                unlinkSync(__dirname + '/cache/package.json')
            }

            sftp.execCommand(`echo ${process.env.PASSWORD} | sudo -S pm2 restart 0`, {
                cwd: remotePath
            }).then(async result => {
                logger.global('STDOUT: ' + result.stdout)
                logger.alert('STDERR: ' + result.stderr)

                setTimeout(() => {
                    logger.alert('[SFTP] Closing session...')
                    process.exit(0)
                }, 10000)
            })
        })
    }
})

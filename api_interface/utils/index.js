const jsonConfig = require("../config.json"); // important !
const Format = require("./handleFormat");
const {
    handleGetFiles,
    handlePostFiles,
    activeRoutes,
    routeNumber,
    app,
    postFiles,
    getFiles,
} = require("./routeHandler");

/* ------------------------------- middleware ------------------------------- */

process.chdir(__dirname); // <3
const format = new Format();

/* --------------------------------- modules -------------------------------- */

require("dotenv").config({ path: jsonConfig.env_path });
/* -------------------------------- functions ------------------------------- */

/* ------------------------------- statics var ------------------------------ */

const errorCodes = require("../../errorCodes.json");
const PORT = process.env.PORT;
const BRAND = `


 _______  ______   _______    _______  _______  ___ 
|       ||      | |       |  |   _   ||       ||   |
|    ___||  _    ||    _  |  |  |_|  ||    _  ||   |
|   |___ | | |   ||   |_| |  |       ||   |_| ||   |
|    ___|| |_|   ||    ___|  |       ||    ___||   |
|   |___ |       ||   |      |   _   ||   |    |   |
|_______||______| |___|      |__| |__||___|    |___|

                                                                                   
`;

/* --------------------------------- process -------------------------------- */

process.on("exit", (code) => {
    console.log(`The process has ended with code: ${code}`);
    // signal code signification
    for (const [key_code, value] of Object.entries(errorCodes)) {
        if (code === Number(key_code)) {
            console.log(`[!] Error code ${code} : ${value}`);
        }
    }
});

/* -------------------------------- functions ------------------------------- */

const sleep = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const runApi = async () => {
    if (!Number(PORT)) {
        process.exit(524);
    }

    console.log(BRAND);
    await Promise.all([handleGetFiles(), handlePostFiles()]);
    activeRoutes.post = [
        ...postFiles.map((element) =>
            format.liveRemoveFileName(
                element,
                jsonConfig.post_route_file_format,
                ""
            )
        ),
    ];
    activeRoutes.get = [
        ...getFiles.map((element) =>
            format.liveRemoveFileName(
                element,
                jsonConfig.get_route_file_format,
                ""
            )
        ),
    ];

    if (routeNumber === 0) {
        console.log("[+] Any routes are registered");
    }

    console.log(jsonConfig.routetype);
    for (let [key, value] of Object.entries(activeRoutes)) {
        const routeType = jsonConfig.routetype[key];

        if (routeType) {
            console.log(`\n[*] Active ${routeType} routes :\n`);
            value.forEach((route) => {
                console.log(
                    `   "http://localhost:${PORT}${route}"  >>>  "${route}"`
                );
            });
        }
    }
    await sleep(750);
    console.log(
        `\n
        /* -------------------------------------------------------------------------- */
        /*               [#] API is running at http://localhost:${PORT}                  */
        /* -------------------------------------------------------------------------- */

>_`
    );
};

const listenApi = () => {
    app.listen(PORT, async () => {
        runApi();
    });
};

listenApi();

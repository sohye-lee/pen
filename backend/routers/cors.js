import cors from 'cors';

const portlist = ['http://localhost:3000', 'https://localhost:3443'];
export const corsWithOptions = (req, cb) => {
    let corsOptions;
    if (portlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    } else {
        corsOptions = { origin: false };
    }

    cb(null, corsOptions);
}

export const cors = cors();


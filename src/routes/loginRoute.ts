import { NextFunction, Request, Response, Router } from 'express';

const router = Router();
interface RequestBody extends Request {
  body: { [key: string]: string | undefined };
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    return next();
  }
  res.status(403);
  res.send(`Whoops! you are not logged in`);
}

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
      <div>
        <h1>You are logged in</h1>
        <a href="/logout">Logout</a>
      </div>
    `);
  } else {
    res.send(`
      <div>
        <h1>You are not logged in</h1>
        <a href="/login">Login</a>
      </div>
    `);
  }
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send(`This is a protected endpoit`);
});

export { router };

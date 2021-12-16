import { rest, setupWorker } from 'msw';

export const mocks = [
  rest.get('https://api.github.com/users/:user', (req, res, ctx) => {
    const { user } = req.params;

    return res(
      ctx.status(200),
      ctx.json({
        name: `mocked-${user}`,
        bio: 'mocked-bio',
      })
    );
  }),
];

const worker = setupWorker(...mocks);
worker.start();

export { worker, rest };

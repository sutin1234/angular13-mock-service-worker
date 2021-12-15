import { render, screen, fireEvent, waitFor } from '@testing-library/angular';
import '@testing-library/jest-dom';
import { CounterComponent } from './counter.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { GitHubService } from '../github.service';

import { server, rest } from '../../mocks/node';
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Counter', () => {
  test('should render counter', async () => {
    await render(CounterComponent, {
      imports: [HttpClientModule, ReactiveFormsModule],
      providers: [GitHubService],
      componentProperties: { counter: 5 },
    });
    expect(screen.getByText('Current Count: 5'));
  });

  test('should increment the counter on click', async () => {
    await render(CounterComponent, {
      imports: [HttpClientModule, ReactiveFormsModule],
      providers: [GitHubService],
      componentProperties: { counter: 5 },
    });
    fireEvent.click(screen.getByText('+'));
    expect(screen.getByText('Current Count: 6'));
  });

  test('should call GitHubService Success', async () => {
    const { getByText } = await render(CounterComponent, {
      imports: [HttpClientModule, ReactiveFormsModule],
      providers: [GitHubService],
      componentProperties: { counter: 5 },
    });

    await waitFor(() => {
      expect(getByText('mocked-sutin1234')).toBeInTheDocument();
    });
  });

  test('should call GitHubService Failed ', async () => {
    server.use(
      rest.get('https://api.github.com/users/:user', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const { getByText } = await render(CounterComponent, {
      imports: [HttpClientModule, ReactiveFormsModule],
      providers: [GitHubService],
      componentProperties: { counter: 5 },
    });

    await waitFor(() => {
      expect(getByText('server error')).toBeInTheDocument();
    });
  });
});

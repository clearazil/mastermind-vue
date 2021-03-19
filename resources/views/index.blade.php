@extends('layouts.main')

@section('content')

  <div class="text-center py-5 px-3">
    <div class="card">
      <div class="card-header">
        Mastermind
      </div>
      <div class="card-body">
        <h5 class="card-title">A code-breaking game agains the computer!</h5>
        <p class="card-text">Press the button below to begin.</p>
        <a href="#" class="btn btn-primary">New game</a>

        <div class="d-flex justify-content-center pt-2">
          <div class="card game-card">
            <div class="card-body">
              <div class="container">
                <div class="row">
                  <div class="col">
                    <button class="code-circle color-neutral" id="dropdownMenuOffset" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="0,0"></button>
                    <ul class="dropdown-menu code-dropdown" aria-labelledby="dropdownMenuOffset">
                      <li>
                        <button class="code-circle color-0">
                          <a class="dropdown-item" href="#">
                          </button>
                        </a>
                      </li>
                      <li>
                        <button class="code-circle color-1">
                          <a class="dropdown-item" href="#">
                          </button>
                        </a>
                      </li>
                      <li>
                        <button class="code-circle color-2">
                          <a class="dropdown-item" href="#">
                          </button>
                        </a>
                      </li>
                      <li>
                        <button class="code-circle color-3">
                          <a class="dropdown-item" href="#">
                          </button>
                        </a>
                      </li>
                      <li>
                        <button class="code-circle color-4">
                          <a class="dropdown-item" href="#">
                          </button>
                        </a>
                      </li>
                      <li>
                        <button class="code-circle color-5">
                          <a class="dropdown-item" href="#">
                          </button>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="col">
                    <button class="code-circle color-neutral"></button>
                  </div>
                  <div class="col">
                    <button class="code-circle color-neutral"></button>
                  </div>
                  <div class="col">
                    <button class="code-circle color-neutral"></button>
                  </div>
                  <div class="col">
                    <div class="row">
                      <div class="col">
                        <span class="code-peg color-neutral"></span>
                      </div>
                      <div class="col">
                        <span class="code-peg color-neutral"></span>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col pt-1">
                        <span class="code-peg color-neutral"></span>
                      </div>
                      <div class="col pt-1">
                        <span class="code-peg color-neutral"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

@endsection

export default function Footer() {
    return (
        <footer className="py-5 d-flex row-gap-5 position-relative">
            <section className="d-flex flex-column row-gap-3 container ps-5 col-sm-3 col-md-3">
                <small className="fw-semibold">&copy;2024 Faansy</small>
                <small className="fw-semibold">Contact</small>
                <span className="d-flex column-gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter-x"
                    viewBox="0 0 16 16">
                        <path
                        d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram"
                        viewBox="0 0 16 16">
                        <path
                            d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                    </svg>
                </span>
            </section>

            <section className="col-sm-8 col-md-8 px-5">
                <div className="row row-gap-3 mb-3">
                    <small className="col-sm-6 col-md-3"><a href="" className="text-decoration-none text-secondary">Help</a></small>
                    <small className="col-sm-6 col-md-3"><a href="" className="text-decoration-none text-secondary">About</a></small>
                    <small className="col-sm-6 col-md-3"><a href="" className="text-decoration-none text-secondary">Blog</a></small>
                    <small className="col-sm-6 col-md-3"><a href="" className="text-decoration-none text-secondary">Branding</a></small>
                    <small className="col-sm-6 col-md-3"><a href="" className="text-decoration-none text-secondary">Store</a></small>
                    <small className="col-sm-6 col-md-3"><a href="" className="text-decoration-none text-secondary">Terms of Service</a></small>
                    <small className="col-sm-6 col-md-3"><a href="" className="text-decoration-none text-secondary">Privacy</a></small>
                    <small className="col-sm-6 col-md-3"><a href="" className="text-decoration-none text-secondary">Complaints Policy</a></small>
                    <small className="col-sm-6 col-md-3"><a href="" className="text-decoration-none text-secondary">Cookie Notice</a></small>
                    <small className="col-sm-6 col-md-3"><a href="" className="text-decoration-none text-secondary">DMCA</a></small>
                    <small className="col-sm-6 col-md-3"><a href="" className="text-decoration-none text-secondary">USC 2257</a></small>
                    <small className="col-sm-6 col-md-3"><a href="" className="text-decoration-none text-secondary">Standard Contract between Fan and Creator</a></small>
                </div>

                <div className="row">
                    <small className="col-sm-6 col-md-3"><a href="" className="text-decoration-none text-secondary">Faansy Safety & Transparency Center</a></small>
                    <small className="col-sm-6 col-md-3"><a href="" className="text-decoration-none text-secondary">Anti-Slavery and Anti-Trafficking Statement</a></small>
                    <small className="col-sm-6 col-md-3"><a href="" className="text-decoration-none text-secondary">Acceptable Use Policy</a></small>
                </div>
            </section>
            
            <div className="position-fixed bottom-0 end-0">
                <a href="#main">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#820303" className="bi bi-arrow-up-square-fill"
                        viewBox="0 0 16 16">
                        <path
                            d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0" />
                    </svg>
                </a>
            </div>
        </footer>
    )
}

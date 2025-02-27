const Twtest = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero sekce s primárním gradientem */}
            <section className="gradient-primary p-8 flex flex-col items-center space-y-6">
                <h1 className="text-4xl font-bold text-light">MusicXML Generator</h1>
                <p className="text-light text-center max-w-2xl">
                    Převeďte vaše hudební nápady do profesionálních notových zápisů pomocí umělé inteligence
                </p>
                <button className="btn-action">
                    Začít generovat
                </button>
            </section>

            {/* Sekce funkcí s kartami */}
            <section className="p-12 bg-light">
                <h2 className="text-3xl font-bold text-primary text-center mb-8">
                    Hlavní funkce
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="card">
                        <h3 className="text-xl font-bold text-primary mb-4">Generování melodie</h3>
                        <p className="text-gray-700 mb-4">
                            Vytvořte unikátní melodie na základě vašich preferencí a žánru
                        </p>
                        <button className="btn-primary">
                            Vyzkoušet
                        </button>
                    </div>
                    <div className="card">
                        <h3 className="text-xl font-bold text-secondary mb-4">Harmonizace</h3>
                        <p className="text-gray-700 mb-4">
                            Automatická harmonizace vašich melodií s pokročilými hudebními pravidly
                        </p>
                        <button className="btn-secondary">
                            Harmonizovat
                        </button>
                    </div>
                    <div className="card">
                        <h3 className="text-xl font-bold text-action mb-4">Export</h3>
                        <p className="text-gray-700 mb-4">
                            Export do MusicXML pro použití ve vašem oblíbeném notačním programu
                        </p>
                        <button className="btn-action">
                            Exportovat
                        </button>
                    </div>
                </div>
            </section>

            {/* CTA sekce se sekundárním gradientem */}
            <section className="gradient-secondary p-12 flex flex-col items-center space-y-6">
                <h2 className="text-3xl font-bold text-light text-center">
                    Připraveni tvořit?
                </h2>
                <p className="text-light text-center max-w-2xl">
                    Vyzkoušejte naši aplikaci zdarma a objevte nové možnosti v hudební tvorbě
                </p>
                <div className="flex gap-4">
                    <button className="btn-primary">
                        Registrace zdarma
                    </button>
                    <button className="btn-secondary">
                        Více informací
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Twtest;
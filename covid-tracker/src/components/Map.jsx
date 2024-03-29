import { Circle, MapContainer, Popup, TileLayer } from "react-leaflet";
import "./Map.css";
import numeral from "numeral"; // Make sure to import numeral

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        rgb: "rgb(204, 16, 52)",
        half_op: "rgba(204, 16, 52, 0.5)",
        multiplier: 800,
    },
    recovered: {
        hex: "#7dd71d",
        rgb: "rgb(125, 215, 29)",
        half_op: "rgba(125, 215, 29, 0.5)",
        multiplier: 1200,
    },
    deaths: {
        hex: "#fb4443",
        rgb: "rgb(251, 68, 67)",
        half_op: "rgba(251, 68, 67, 0.5)",
        multiplier: 2000,
    },
};
/*eslint-disable */
function Map({ countries, casesType, center, zoom }) {
    return (
        <div className="map">
            <MapContainer center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {countries.map((country) => (
                    <Circle
                        key={country.country}
                        center={[country.countryInfo.lat, country.countryInfo.long]}
                        color={casesTypeColors[casesType].hex}
                        fillColor={casesTypeColors[casesType].hex}
                        fillOpacity={0.4}
                        radius={
                            Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
                        }
                    >
                        <Popup>
                            <div className="info-container">
                                <div
                                    className="info-flag"
                                    style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                                />
                                <div className="info-name">{country.country}</div>
                                <div className="info-confirmed">
                                    Cases: {numeral(country.cases).format("0,0")}
                                </div>
                                <div className="info-recovered">
                                    Recovered: {numeral(country.recovered).format("0,0")}
                                </div>
                                <div className="info-deaths">
                                    Deaths: {numeral(country.deaths).format("0,0")}
                                </div>
                            </div>
                        </Popup>
                    </Circle>
                ))}
            </MapContainer>
        </div>
    );
}

export default Map;

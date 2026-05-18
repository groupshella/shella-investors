"use client";

import {
  CheckCircle2,
  Loader2,
  MapPin,
  Navigation,
  Search,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  type MapMouseEvent,
} from "@vis.gl/react-google-maps";
import useMap from "@/hooks/useMapHook";
import type { PartnershipFormData } from "@/types/partnershipForm";

interface Props {
  form: PartnershipFormData;
  setForm: React.Dispatch<React.SetStateAction<PartnershipFormData>>;
  error?: string;
}

function MapSection({ form, setForm, error }: Props) {
  const { mapCenter, mapZoom, markerPos, selectFromMap, getCurrentLocation } =
    useMap(setForm);

  const [mapLoaded, setMapLoaded] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? "";
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID ?? "DEMO_MAP_ID";
  const hasKey = apiKey.length > 0;

  const fallbackCoords = useMemo(() => {
    if (!form.latitude || !form.longitude) return null;
    return { lat: Number(form.latitude), lng: Number(form.longitude) };
  }, [form.latitude, form.longitude]);

  const onMapClick = useCallback(
    (event: MapMouseEvent) => {
      const latLng = event.detail.latLng;
      if (!latLng) return;
      selectFromMap(latLng.lat, latLng.lng);
    },
    [selectFromMap],
  );

  const coordsReady = markerPos || (form.latitude && form.longitude);

  return (
    <div className="space-y-3">
      <label className="block text-foreground text-sm font-semibold mb-2">الموقع</label>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        {hasKey && (
          <div className="relative flex-1">
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none"
              strokeWidth={2}
            />
            <input
              type="text"
              placeholder="ابحث عن موقع في الخريطة..."
              className="input-field pr-10"
              dir="rtl"
            />
          </div>
        )}
        <button
          type="button"
          onClick={getCurrentLocation}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition-all whitespace-nowrap flex-shrink-0"
        >
          <Navigation className="w-4 h-4" strokeWidth={2.5} />
          موقعي الحالي
        </button>
      </div>
      <div
        className={`relative rounded-2xl overflow-hidden border bg-dark-100/50 ${error ? "border-danger" : "border-dark-200/50"}`}
        style={{ height: "360px" }}
      >
        {hasKey ? (
          <>
            {!mapLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white z-10">
                <Loader2 className="w-7 h-7 text-primary animate-spin" strokeWidth={2} />
                <p className="text-sm text-muted">جاري تحميل الخريطة...</p>
              </div>
            )}
            <APIProvider apiKey={apiKey} language="ar">
              <Map
                className="w-full h-full"
                mapId={mapId}
                center={mapCenter}
                zoom={mapZoom}
                onClick={onMapClick}
                onTilesLoaded={() => setMapLoaded(true)}
                disableDefaultUI
                clickableIcons={false}
                gestureHandling="greedy"
              >
                {markerPos && (
                  <AdvancedMarker position={markerPos}>
                    <Pin background="#16a34a" borderColor="#15803d" glyphColor="#ffffff" />
                  </AdvancedMarker>
                )}
              </Map>
            </APIProvider>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <MapPin className="w-7 h-7 text-primary" strokeWidth={1.8} />
            </div>
            <p className="text-sm font-semibold text-muted text-center">أدخل إحداثيات الموقع يدوياً</p>
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-muted font-medium">خط العرض</label>
                <input
                  type="text"
                  name="latitude"
                  placeholder="24.7136"
                  value={form.latitude}
                  onChange={(e) => setForm((p) => ({ ...p, latitude: e.target.value }))}
                  className="input-field"
                  dir="ltr"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-muted font-medium">خط الطول</label>
                <input
                  type="text"
                  name="longitude"
                  placeholder="46.6753"
                  value={form.longitude}
                  onChange={(e) => setForm((p) => ({ ...p, longitude: e.target.value }))}
                  className="input-field"
                  dir="ltr"
                />
              </div>
            </div>
          </div>
        )}
        {coordsReady && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-primary/30 shadow-sm text-xs font-medium text-primary">
            <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2.5} />
            {markerPos?.lat ?? fallbackCoords?.lat}, {markerPos?.lng ?? fallbackCoords?.lng}
          </div>
        )}
      </div>
      <p className="text-xs text-muted flex items-center gap-1.5">
        <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
        انقر على الخريطة لتحديد موقعك، أو استخدم زر «موقعي الحالي»
      </p>
      {form.location && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 px-3 py-2.5">
          <p className="text-xs text-muted mb-1">الموقع المحدد</p>
          <p className="text-sm font-semibold text-foreground">{form.location}</p>
        </div>
      )}
      {error && <p className="text-danger text-xs">{error}</p>}
    </div>
  );
}

export default MapSection;
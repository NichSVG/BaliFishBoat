import { MapPin } from "lucide-react";

export default function LocationMap() {
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
      <div className="bg-slate-50 p-4 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-blue-600" />
        <span className="text-sm font-medium text-slate-700">
          Serangan Harbor, Denpasar, Bali
        </span>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12607.7!2d115.24!3d-8.72!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2457540000001%3A0x403e48b1a2f40e0!2sSerangan%2C%20Denpasar%20Selatan%2C%20Kota%20Denpasar%2C%20Bali!5e0!3m2!1sen!2sid!4v1"
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Serangan Harbor location"
      />
    </div>
  );
}

"use client"

interface TimeSlotPickerProps {
  onTimeSelect: (time: string) => void
  selectedTime?: string
  availableSlots?: string[]
}

export function TimeSlotPicker({ onTimeSelect, selectedTime, availableSlots }: TimeSlotPickerProps) {
  const defaultSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
  ]

  const slots = availableSlots || defaultSlots

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-900 mb-4">Available Times</h3>
      <div className="grid grid-cols-2 gap-2">
        {slots.map((slot) => (
          <button
            key={slot}
            onClick={() => onTimeSelect(slot)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
              selectedTime === slot
                ? "bg-indigo-600 text-white"
                : "bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  )
}

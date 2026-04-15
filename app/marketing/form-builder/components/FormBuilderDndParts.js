import { Trash2, GripVertical } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export function SortableFieldItem({ field, isSelected, onSelect, onRemove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const fieldStyles = field.styles || {}

  const getInputStyle = () => {
    return {
      backgroundColor: fieldStyles.backgroundColor,
      padding: `${fieldStyles.paddingTop || '0.5rem'} ${fieldStyles.paddingRight || '0.75rem'} ${fieldStyles.paddingBottom || '0.5rem'} ${fieldStyles.paddingLeft || '0.75rem'}`,
      borderWidth: fieldStyles.borderWidth || '1px',
      borderStyle: fieldStyles.borderStyle || 'solid',
      borderColor: fieldStyles.borderColor || '#e2e8f0',
      borderRadius: fieldStyles.borderRadius || '0.375rem',
      width: fieldStyles.width || '100%',
    }
  }

  const getLabelStyle = () => {
    const styleValue = {
      fontWeight: fieldStyles.fontWeight || '500',
      color: fieldStyles.color || '#334155',
    }
    if (fieldStyles.fontSize) {
      styleValue.fontSize = fieldStyles.fontSize
    } else {
      styleValue.fontSize = '0.875rem'
    }
    if (fieldStyles.fontFamily) {
      styleValue.fontFamily = fieldStyles.fontFamily
    }
    if (fieldStyles.letterSpacing) {
      styleValue.letterSpacing = fieldStyles.letterSpacing
    }
    if (fieldStyles.textAlign) {
      styleValue.textAlign = fieldStyles.textAlign
    }
    if (fieldStyles.textTransform) {
      styleValue.textTransform = fieldStyles.textTransform
    }
    return styleValue
  }

  const containerStyle = {
    margin: `${fieldStyles.marginTop || '0'} ${fieldStyles.marginRight || '0'} ${fieldStyles.marginBottom || '0'} ${fieldStyles.marginLeft || '0'}`,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${
        isSelected
          ? 'ring-2 ring-brand ring-offset-2'
          : 'hover:bg-slate-50'
      } rounded-lg transition-all`}
    >
      <div className="absolute -left-10 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          {...attributes}
          {...listeners}
          className="p-1.5 hover:bg-slate-200 rounded cursor-grab active:cursor-grabbing bg-white border border-slate-200 shadow-sm"
          onClick={(e) => e.stopPropagation()}
          title="Drag to reorder"
        >
          <GripVertical className="h-4 w-4 text-slate-500" />
        </button>
        <button
          className={`p-1.5 rounded bg-white border border-slate-200 shadow-sm ${
            field.locked ? 'opacity-40 cursor-not-allowed' : 'hover:bg-red-50'
          }`}
          onClick={(e) => {
            e.stopPropagation()
            if (field.locked) return
            onRemove(field.id)
          }}
          title={field.locked ? 'This field is required' : 'Remove field'}
          disabled={field.locked}
        >
          <Trash2 className="h-4 w-4 text-slate-500 hover:text-red-500" />
        </button>
      </div>

      <div
        onClick={() => onSelect(field.id)}
        className="p-4 cursor-pointer"
        style={containerStyle}
      >
        <Label className="block mb-2" style={getLabelStyle()}>
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </Label>

        {field.type === 'textarea' ? (
          <textarea
            placeholder={field.placeholder}
            className="w-full resize-none focus:outline-none focus:ring-2 focus:ring-brand"
            style={getInputStyle()}
            rows={3}
            disabled
          />
        ) : field.type === 'select' ? (
          <select
            className="w-full focus:outline-none focus:ring-2 focus:ring-brand"
            style={getInputStyle()}
            disabled
            defaultValue=""
          >
            <option value="">Select an option</option>
            {(field.options || []).map((opt) => (
              <option key={opt.value || opt.label} value={opt.value || opt.label}>
                {opt.label || opt.value}
              </option>
            ))}
          </select>
        ) : field.type === 'checkbox' ? (
          <div className="flex flex-col gap-2">
            {(field.options && field.options.length > 0) ? (
              field.options.map((opt) => (
                <div key={opt.value || opt.label} className="flex items-center gap-2">
                  <input type="checkbox" disabled className="h-4 w-4 text-brand" />
                  <span className="text-sm text-slate-600">{opt.label || opt.value}</span>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-2">
                <input type="checkbox" disabled className="h-4 w-4 text-brand" />
                <span className="text-sm text-slate-600">{field.placeholder || 'Checkbox option'}</span>
              </div>
            )}
          </div>
        ) : field.type === 'rating' ? (
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-2xl" style={{ color: '#cbd5e1' }}>★</span>
            ))}
          </div>
        ) : (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            disabled
            className="focus:outline-none focus:ring-2 focus:ring-brand"
            style={getInputStyle()}
          />
        )}
      </div>
    </div>
  )
}

export function DraggableFieldType({ fieldType, onClick }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `field-type-${fieldType.id}`,
    data: {
      type: 'fieldType',
      fieldType,
    },
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  const IconComponent = fieldType.icon

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => onClick?.(fieldType)}
      className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-colors text-sm font-medium text-slate-700 cursor-grab active:cursor-grabbing border border-transparent hover:border-slate-200 ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <IconComponent className="h-5 w-5 text-slate-600" />
      <span className="text-left flex-1">{fieldType.name}</span>
    </button>
  )
}

export function DroppableCanvas({ children, isEmpty }) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'form-canvas',
    data: {
      type: 'canvas',
    },
  })

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[500px] transition-colors ${
        isOver ? 'bg-brand/10 border-2 border-brand-light border-dashed' : ''
      } ${
        isEmpty ? 'border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center' : ''
      }`}
    >
      {children}
    </div>
  )
}

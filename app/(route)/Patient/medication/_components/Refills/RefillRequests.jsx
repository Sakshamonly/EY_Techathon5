import React from "react"
import { Package, Clock, CheckCircle } from "lucide-react"

export function RefillRequests({ refillRequests }) {
  const getStatusIcon = status => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "in-progress":
        return <Package className="w-5 h-5 text-blue-500" />
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Refill Requests</h2>
      <div className="space-y-4">
        {refillRequests.map(request => (
          <div key={request.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(request.status)}
                <div>
                  <p className="font-medium text-gray-800">
                    Request #{request.id.slice(0, 8)}
                  </p>
                  <p className="text-sm text-gray-600">{request.pharmacy}</p>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {request.estimatedDelivery && (
                  <p>Estimated: {request.estimatedDelivery}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
